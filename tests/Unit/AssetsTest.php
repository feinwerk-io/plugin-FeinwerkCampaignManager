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
 * Every script in javascripts/ and every stylesheet in stylesheets/ is registered with Matomo's asset manager, and
 * nothing is registered that is not there. Without javascripts/promo.js the tip line would stay hidden (promo.css shows
 * it only once the script has checked it). Read from the plugin class's source: the unit tests load no Matomo code, so
 * the plugin class (a \Piwik\Plugin) cannot be loaded here.
 */
class AssetsTest extends TestCase
{
    /** @return string[] the files registered in FeinwerkCampaignManager.php for $directory */
    private static function registered(string $directory): array
    {
        $source = (string) file_get_contents(__DIR__ . '/../../FeinwerkCampaignManager.php');
        preg_match_all("~'plugins/FeinwerkCampaignManager/" . $directory . "/([^']+)'~", $source, $m);
        $files = $m[1];
        sort($files);

        return $files;
    }

    /** @return string[] the plugin's files in $directory with one of $extensions */
    private static function files(string $directory, array $extensions): array
    {
        $files = [];
        foreach ((array) scandir(__DIR__ . '/../../' . $directory) as $name) {
            if (in_array(pathinfo((string) $name, PATHINFO_EXTENSION), $extensions, true)) {
                $files[] = (string) $name;
            }
        }
        sort($files);

        return $files;
    }

    public function test_every_script_is_registered(): void
    {
        self::assertContains('promo.js', self::registered('javascripts'));
        self::assertSame(self::files('javascripts', ['js']), self::registered('javascripts'));
    }

    public function test_every_stylesheet_is_registered(): void
    {
        self::assertContains('promo.css', self::registered('stylesheets'));
        self::assertContains('feinwerklogo.css', self::registered('stylesheets'));
        self::assertSame(self::files('stylesheets', ['css', 'less']), self::registered('stylesheets'));
    }
}
