<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Unit;

use PHPUnit\Framework\TestCase;

/**
 * The plugin's metadata follows the Feinwerk rules. Loads no Matomo code and never pins the plugin version: fw-release
 * sets it from CHANGELOG.md when it pushes a release.
 *
 * @group FeinwerkCampaignManager
 */
class PluginMetadataTest extends TestCase
{
    private const PLUGIN = 'FeinwerkCampaignManager';

    private static function path(string $file): string
    {
        return dirname(__DIR__, 2) . '/' . $file;
    }

    private static function json(string $file): array
    {
        $data = json_decode((string) file_get_contents(self::path($file)), true);
        self::assertIsArray($data, "$file is no JSON object");
        return $data;
    }

    public function test_pluginJson_hasTheFeinwerkMetadata(): void
    {
        $plugin = self::json('plugin.json');

        $this->assertSame(self::PLUGIN, $plugin['name']);
        $this->assertSame('GPL v3+', $plugin['license']);
        // listed on the Matomo Marketplace: the Plugin Website link is the store page with campaign parameters
        // (/srv/feinwerk-worktrees/docs/marketplace-listings.md, Peter 2026-11-17); authors[].homepage stays feinwerk.io
        $this->assertSame(
            'https://plugins.feinwerk.io/en/plugins/FeinwerkCampaignManager?mtm_campaign=matomo-marketplace&mtm_source=FeinwerkCampaignManager',
            $plugin['homepage']
        );
        $this->assertSame(
            [['name' => 'Peter Boehlke, Feinwerk.io', 'email' => 'support@feinwerk.io', 'homepage' => 'https://feinwerk.io']],
            $plugin['authors']
        );
        // one build for Matomo 5 and 6 (PluginLead's recommendation, 2026-11-20): never the key piwik, never <6.0.0
        $this->assertSame(['matomo' => '>=5.0.0,<7.0.0-b1', 'php' => '>=8.1.0'], $plugin['require']);
    }

    /** what the Matomo Marketplace shows: category, support, a short description, the FAQ tab, cover and screenshots */
    public function test_theMarketplaceListingIsComplete(): void
    {
        $plugin = self::json('plugin.json');
        $this->assertSame('insights', $plugin['category']);
        $this->assertSame('support@feinwerk.io', $plugin['support']['email']);
        $this->assertSame('https://plugins.feinwerk.io/en/docs/plugins/FeinwerkCampaignManager', $plugin['support']['docs']);
        $this->assertLessThanOrEqual(150, mb_strlen($plugin['description']));
        $this->assertNotEmpty($plugin['keywords']);

        $readme = (string) file_get_contents(self::path('README.md'));
        $this->assertSame(1, preg_match('/^## Description\n(.*?)^## /ms', $readme, $description));
        $this->assertStringContainsString('https://plugins.matomo.org/FeinwerkMarketplaceConnector', $description[1]);

        $faq = (string) file_get_contents(self::path('docs/faq.md'));
        $this->assertGreaterThanOrEqual(5, preg_match_all('/^__.+\?__$/m', $faq));

        $this->assertFileExists(self::path('screenshots/_cover.png'));
        $shots = glob(self::path('screenshots/[1-9]_*.png')) ?: [];
        $this->assertNotEmpty(glob(self::path('screenshots/1_*.png')), 'the first screenshot is the hero');
        foreach ($shots as $shot) {
            // the file name is the caption: letters, digits, _ and - only
            $this->assertSame(1, preg_match('/^[1-9]_[A-Za-z0-9_-]+\.png$/', basename($shot)), basename($shot));
        }
    }

    public function test_version_followsTheMatomoLineAndTheChangelog(): void
    {
        $plugin = self::json('plugin.json');
        $this->assertSame(1, preg_match('/^>=(\d+)\./', $plugin['require']['matomo'], $line));
        $this->assertMatchesRegularExpression('/^' . $line[1] . '\.\d+\.\d+(-[0-9A-Za-z.]+)?$/', $plugin['version']);

        // once there is a version heading in CHANGELOG.md, the newest one is the version of plugin.json
        $changelog = (string) file_get_contents(self::path('CHANGELOG.md'));
        if (preg_match('/^## v?(\d+\.\d+\.\d+(?:-[0-9A-Za-z.]+)?)(?: \(\d{4}-\d{2}-\d{2}\))?\s*$/m', $changelog, $heading)) {
            $this->assertSame($heading[1], $plugin['version']);
        }
    }

    public function test_translations_haveTheSameKeysInEnglishAndGerman(): void
    {
        $en = self::json('lang/en.json')[self::PLUGIN];
        $de = self::json('lang/de.json')[self::PLUGIN];

        $this->assertSame([], array_values(array_diff(array_keys($en), array_keys($de))), 'missing in de.json');
        $this->assertSame([], array_values(array_diff(array_keys($de), array_keys($en))), 'missing in en.json');
        $this->assertNotSame('', $en['PluginName']);
    }

    public function test_licenseFileAndPhpHeaders_matchTheLicense(): void
    {
        // LICENSE.txt instead of LICENSE once the plugin has a License/ directory (case-insensitive file systems)
        $file = is_file(self::path('LICENSE')) ? 'LICENSE' : 'LICENSE.txt';
        $license = (string) file_get_contents(self::path($file));
        foreach (['GNU GENERAL PUBLIC LICENSE', 'Version 3'] as $mark) {
            $this->assertStringContainsString($mark, $license, $file);
        }

        $root = dirname(__DIR__, 2);
        $dirs = new \RecursiveCallbackFilterIterator(
            new \RecursiveDirectoryIterator($root, \FilesystemIterator::SKIP_DOTS),
            static function (\SplFileInfo $file): bool {
                return !($file->isDir() && in_array($file->getFilename(), ['vendor', 'node_modules', '.git'], true));
            }
        );
        $checked = 0;
        foreach (new \RecursiveIteratorIterator($dirs) as $file) {
            if ($file->getExtension() !== 'php') {
                continue;
            }
            $head = (string) file_get_contents($file->getPathname(), false, null, 0, 2048);
            $this->assertStringContainsString('@license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later', $head, substr($file->getPathname(), strlen($root) + 1));
            $checked++;
        }
        $this->assertGreaterThan(0, $checked);
    }
}
