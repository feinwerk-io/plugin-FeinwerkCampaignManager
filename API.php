<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager;

use Piwik\Container\StaticContainer;
use Piwik\Date;
use Piwik\Option;
use Piwik\Piwik;
use Piwik\Plugin\Manager as PluginManager;
use Piwik\Plugins\FeinwerkCampaignManager\Feedback\PluginFeedback;
use Piwik\Plugins\FeinwerkCampaignManager\Http\InvalidInputException;
use Piwik\Plugins\FeinwerkCampaignManager\Link\Fields;
use Piwik\Plugins\FeinwerkCampaignManager\Link\Templates;
use Piwik\Plugins\FeinwerkCampaignManager\Campaign\Overview;
use Piwik\Plugins\FeinwerkCampaignManager\Model\CampaignPresenter;
use Piwik\Plugins\FeinwerkCampaignManager\Model\CampaignResults;
use Piwik\Plugins\FeinwerkCampaignManager\Model\CampaignService;
use Piwik\Plugins\FeinwerkCampaignManager\Model\InstanceContext;
use Piwik\Plugins\FeinwerkCampaignManager\Model\LinkLiveDetector;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformConfig;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformError;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformService;
use Piwik\Plugins\FeinwerkCampaignManager\Model\LinkPresenter;
use Piwik\Plugins\FeinwerkCampaignManager\Model\LinkResults;
use Piwik\Plugins\FeinwerkCampaignManager\Model\LinkService;
use Piwik\Plugins\FeinwerkCampaignManager\Model\Messages;
use Piwik\Plugins\FeinwerkCampaignManager\Model\QualityIssues;
use Piwik\Plugins\FeinwerkCampaignManager\Model\Suggestions;
use Piwik\Site;
use Piwik\Translation\Translator;
use Piwik\Version;

/**
 * Feinwerk Campaign Manager: build campaign links for a website, check them, save them in a shared list and find them again.
 *
 * Every screen of the plugin uses these methods. Fields of a link: campaign (required), source, medium, keyword,
 * content, campaignId, group, placement. Parameter sets: utm (default), mtm, and own when this Matomo is configured
 * for other names (see getParameterSets). Core Matomo stores only campaign and keyword; the other fields need the free
 * plugin Marketing Campaigns Reporting. Short links and QR codes need a connection to the Feinwerk Campaigns platform
 * (see getConnectionStatus); none of these methods calls the platform or any other outside service.
 *
 * Access: view access reads and previews, write access saves, changes and archives. Invalid input answers HTTP 400
 * with a message naming the parameter, the value and what is allowed; an unknown idLink answers HTTP 404.
 *
 * @method static \Piwik\Plugins\FeinwerkCampaignManager\API getInstance()
 */
class API extends \Piwik\Plugin\API
{
    /**
     * Raw input: links and campaign values must arrive as typed ("&" stays "&", not "&amp;"). Nothing here renders
     * HTML; the UI escapes on output (Vue text, Twig). Exists from Matomo 5.0.0.
     */
    protected $autoSanitizeInputParams = false;

    public const SUGGESTION_FIELDS = [Fields::CAMPAIGN, Fields::SOURCE, Fields::MEDIUM, Fields::KEYWORD, Fields::CONTENT, Fields::GROUP, Fields::PLACEMENT];

    /**
     * Tells whether this Matomo is connected to the Feinwerk Campaigns platform, in which state, and which platform
     * features work now. Use it to explain why short links or QR codes are not available. Asks the platform at most
     * every 5 minutes and makes no call at all while not connected. Connecting needs a person in a browser (sign-in,
     * consent): send a super user to connectUrl.
     *
     * @return array{mode: string, connected: bool, state: string, reason: string, workspace: ?array{id: string,
     *               name: string}, person: ?array{name: string, role: string}, trial: ?array{endsAt: string,
     *               daysLeft: int}, canBuy: bool, links: array{app: ?string, buy: ?string}, features: array{shortLinks:
     *               bool, qrCodes: bool}, canConnect: bool, connectUrl: ?string, checkedAt: string}
     *         mode: disabled ([FeinwerkCampaignManager] platform = 0), standalone (not connected) or connected;
     *         connected: platform features can be used now; state: none, trial, active, expired (trial ended
     *         unpurchased), lost (token revoked, or the person who connected lost access), blocked, unknown (no answer
     *         yet); reason: why platform features are off, '' when they work: platform_disabled, not_connected,
     *         trial_ended, connection_lost, access_lost, blocked, unreachable, internet_disabled; person: who approved
     *         the connection (super users only); trial: end (ISO 8601 UTC) and whole days left; links: the workspace in
     *         the platform and its buy dialog (absolute URLs of the platform); canConnect: whether this user may
     *         (re)connect; connectUrl: the admin page for it, relative to Matomo (super users only); checkedAt: when
     *         the platform was last asked (Y-m-d H:i:s UTC)
     */
    public function getConnectionStatus(): array
    {
        Piwik::checkUserHasSomeViewAccess();
        $lang = self::userLanguage() === 'de' ? 'de' : 'en';
        $status = StaticContainer::get(PlatformService::class)->status($lang, Date::now()->getDatetime());
        $superUser = Piwik::hasUserSuperUserAccess();
        $connected = $status['mode'] === 'connected' && $status['reason'] === '';

        return [
            'mode' => $status['mode'],
            'connected' => $connected,
            'state' => $status['state'],
            'reason' => $status['reason'],
            'workspace' => $status['workspace'],
            'person' => $superUser ? $status['person'] : null,
            'trial' => $status['trial'],
            'canBuy' => $superUser && $status['canBuy'],
            'links' => ['app' => $status['links']['app'], 'buy' => $superUser ? $status['links']['buy'] : null],
            'features' => $status['features'],
            'canConnect' => $superUser && $status['mode'] !== 'disabled' && !PlatformConfig::isWordPress(),
            'connectUrl' => $superUser && $status['mode'] !== 'disabled' ? 'index.php?module=FeinwerkCampaignManager&action=platform' : null,
            'checkedAt' => $status['checkedAt'],
        ];
    }

    /**
     * Ends the connection to Feinwerk Campaigns: revokes the token on the platform (when it answers) and removes it
     * from this Matomo in any case. Saved links and campaign details stay. Super users only.
     *
     * @return array the connection status afterwards, as getConnectionStatus
     */
    public function disconnectPlatform(): array
    {
        Piwik::checkUserHasSuperUserAccess();
        StaticContainer::get(PlatformService::class)->disconnect();

        return $this->getConnectionStatus();
    }

    /**
     * The naming convention of the connected Feinwerk Campaigns workspace and the workspace website this Matomo
     * website maps to: parameter names, fields with their value lists, channels and ad networks, as the connected
     * link builder uses them. Needs write access to the website and a working connection (HTTP 409 with the reason
     * otherwise, see getConnectionStatus).
     *
     * @param int $idSite website id (required)
     * @return array{website: array{id: string, name: string, url: string, match: string}, convention: array} website: match
     *         is site (tied to this Matomo site) or domain; convention: as the
     *         platform answers it (parameters.style, parameters.names per field, fields with key, label, type, required,
     *         values; channels with key, label, source, medium; networks with key, label, values)
     */
    public function getPlatformConvention($idSite = null): array
    {
        $idSite = $this->idSite($idSite);
        // write access, like the builder that uses it: each call reaches the platform on the connection's rate limit
        Piwik::checkUserHasWriteAccess($idSite);
        $lang = self::platformLanguage();
        $service = StaticContainer::get(PlatformService::class);
        try {
            return ['website' => $this->platformWebsite($idSite), 'convention' => $service->convention($lang)];
        } catch (PlatformError $e) {
            throw $this->platformError($e);
        }
    }

    /**
     * Searches the campaigns of the connected Feinwerk Campaigns workspace that belong to this website's workspace
     * website, for the connected link builder's campaign picker. Needs write access to the website, a working connection
     * and a matching website (HTTP 409 with the reason otherwise).
     *
     * @param int $idSite website id (required)
     * @param string $query part of the campaign name or parameter, case-insensitive (optional, all when empty)
     * @param int $limit at most this many, 1 to 100 (default 20)
     * @return list<array{id: string, name: string, parameter: string, status: string, startsOn: ?string,
     *               endsOn: ?string, appUrl: ?string}> id: the platform's campaign id (for addPlatformLink); parameter:
     *               the campaign value in the link; status: as the platform says (draft, preparing, ready, live, paused,
     *               ended)
     */
    public function getPlatformCampaigns($idSite = null, string $query = '', $limit = 20): array
    {
        $idSite = $this->idSite($idSite);
        // write access, like the builder that uses it: each call reaches the platform on the connection's rate limit
        Piwik::checkUserHasWriteAccess($idSite);
        $limit = $this->intParam('limit', $limit, 1, 100);
        try {
            // only the campaigns of this site's workspace website: a view user of one site never sees the others
            $website = $this->platformWebsite($idSite);
            $rows = StaticContainer::get(PlatformService::class)->campaignsOfWebsite(self::platformLanguage(), trim($query), $website['id'], $limit);
        } catch (PlatformError $e) {
            throw $this->platformError($e);
        }
        return array_map([self::class, 'platformCampaign'], $rows);
    }

    /**
     * Creates a campaign draft in the connected Feinwerk Campaigns workspace for this website, for the connected link
     * builder (a platform link always belongs to a platform campaign). The same name and parameter again returns the
     * existing campaign (existed: true). Needs write access and a working connection.
     *
     * @param int $idSite website id (required)
     * @param string $name the campaign's name, e.g. "Herbstaktion" (required, at most 255 characters)
     * @param string $parameter the campaign value in links (optional; the workspace's pattern builds it from the name
     *                          when empty, and a given one must fit that pattern)
     * @param string $startDate first day, YYYY-MM-DD (optional)
     * @param string $endDate last day, YYYY-MM-DD (optional)
     * @return array{campaign: array, existed: bool} campaign: as getPlatformCampaigns lists it
     */
    public function addPlatformCampaign($idSite = null, string $name = '', string $parameter = '', string $startDate = '', string $endDate = ''): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasWriteAccess($idSite);
        $name = trim($name);
        if ($name === '' || mb_strlen($name, 'UTF-8') > 255) {
            throw new InvalidInputException($this->messages()->invalidValue('name', $name, ['1 to 255 characters']));
        }
        foreach (['startDate' => $startDate, 'endDate' => $endDate] as $param => $date) {
            if (trim($date) !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', trim($date))) {
                throw new InvalidInputException($this->messages()->invalidDate($param, $date));
            }
        }
        try {
            $website = $this->platformWebsite($idSite);
            $answer = StaticContainer::get(PlatformService::class)->createCampaign(
                self::platformLanguage(), $website['id'], $name, trim($parameter), trim($startDate), trim($endDate)
            );
        } catch (PlatformError $e) {
            throw $this->platformError($e);
        }
        return ['campaign' => self::platformCampaign($answer['campaign']), 'existed' => $answer['existed']];
    }

    /**
     * Builds and checks a link with the connected workspace's convention, without saving it anywhere (the dry run of
     * addPlatformLink). Needs write access to the website and a working connection; it counts against the platform's
     * rate limit (120 requests per minute for the whole connection), so call it on demand, not per keystroke.
     *
     * @param int $idSite website id (required)
     * @param string $targetUrl where the link leads, a full http or https URL of this website (required)
     * @param string $platformCampaignId the platform campaign's id from getPlatformCampaigns or addPlatformCampaign
     *                                   (required)
     * @param string $source source, from the convention's list where it has one (see getPlatformConvention)
     * @param string $medium medium, from the convention's list where it has one
     * @param string $content content (optional)
     * @param string $keyword keyword or term (optional)
     * @param string $channel a channel key or ad network key of the convention (optional), e.g. newsletter or google
     * @param string $placement placement (optional)
     * @param bool $shortLink also make a short link (default 0)
     * @param bool $dynamicQr also make a dynamic QR code, needs shortLink (default 0)
     * @return array{url: string, params: list<array{key: string, name: string, value: string}>, errors: array,
     *               warnings: list<string>} as the platform answers: the link, its parameters, errors per field
     */
    public function previewPlatformLink($idSite = null, string $targetUrl = '', string $platformCampaignId = '', string $source = '', string $medium = '', string $content = '', string $keyword = '', string $channel = '', string $placement = '', $shortLink = 0, $dynamicQr = 0): array
    {
        $idSite = $this->idSite($idSite);
        // write access, like the builder that uses it: each call reaches the platform on the connection's rate limit
        Piwik::checkUserHasWriteAccess($idSite);
        try {
            $body = $this->platformLinkBody($idSite, $targetUrl, $platformCampaignId, $source, $medium, $content, $keyword, $channel, $placement, $shortLink, $dynamicQr);
            return StaticContainer::get(PlatformService::class)->previewLink(self::platformLanguage(), $body);
        } catch (PlatformError $e) {
            throw $this->platformError($e);
        }
    }

    /**
     * Creates a link in the connected Feinwerk Campaigns workspace, with a short link and a dynamic QR code when asked,
     * and keeps it in this website's list of saved links (live from now on: its short link and QR code redirect at
     * once). The same link again returns the existing one (existed: true). Needs write access and a working connection.
     *
     * @param int $idSite website id (required)
     * @param string $targetUrl see previewPlatformLink (required)
     * @param string $platformCampaignId see previewPlatformLink (required)
     * @param string $source see previewPlatformLink
     * @param string $medium see previewPlatformLink
     * @param string $content see previewPlatformLink
     * @param string $keyword see previewPlatformLink
     * @param string $channel see previewPlatformLink
     * @param string $placement see previewPlatformLink
     * @param bool $shortLink see previewPlatformLink
     * @param bool $dynamicQr see previewPlatformLink
     * @param string $note a note for the team, kept in this Matomo only (optional, at most 2000 characters)
     * @param string $startDate first day of use, YYYY-MM-DD, kept in this Matomo only (optional)
     * @param string $endDate last day of use, YYYY-MM-DD, kept in this Matomo only (optional)
     * @return array{link: array, existed: bool} link: as getLink, with platform (id, campaignId, shortUrl, qr, appUrl);
     *         its QR code downloads from platform.qrUrl through this Matomo (add &format=svg, png, pdf or eps)
     */
    public function addPlatformLink($idSite = null, string $targetUrl = '', string $platformCampaignId = '', string $source = '', string $medium = '', string $content = '', string $keyword = '', string $channel = '', string $placement = '', $shortLink = 0, $dynamicQr = 0, string $note = '', string $startDate = '', string $endDate = ''): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasWriteAccess($idSite);
        $service = StaticContainer::get(PlatformService::class);
        $lang = self::platformLanguage();
        // everything that can fail here is checked before the platform creates the link, which is live at once there
        $this->service()->platformExtras($note, $startDate, $endDate);
        try {
            $body = $this->platformLinkBody($idSite, $targetUrl, $platformCampaignId, $source, $medium, $content, $keyword, $channel, $placement, $shortLink, $dynamicQr);
            $body['status'] = 'live';
            $convention = $service->convention($lang);
            $answer = $service->createLink($lang, $body);
        } catch (PlatformError $e) {
            throw $this->platformError($e);
        }
        $names = (array) ($convention['parameters']['names'] ?? []);
        $style = (string) ($convention['parameters']['style'] ?? 'own');
        try {
            $saved = $this->service()->addFromPlatform($idSite, $answer['link'], $names, $style, $note, $startDate, $endDate, Piwik::getCurrentUserLogin(), Date::now()->getDatetime());
        } catch (\InvalidArgumentException $e) {
            // the platform answered without a usable link URL
            throw $this->platformError(new PlatformError(PlatformError::BAD_ANSWER, 200));
        }

        return ['link' => LinkPresenter::link($saved['row']), 'existed' => $answer['existed'] || $saved['existed']];
    }

    /**
     * @return array<string, mixed> the body of the platform's POST /links and /links/preview
     * @throws PlatformError
     */
    private function platformLinkBody(int $idSite, string $targetUrl, string $platformCampaignId, string $source, string $medium, string $content, string $keyword, string $channel, string $placement, $shortLink, $dynamicQr): array
    {
        $targetUrl = trim($targetUrl);
        if ($targetUrl === '' || !preg_match('#^https?://#i', $targetUrl)) {
            throw new InvalidInputException($this->messages()->invalidValue('targetUrl', $targetUrl, ['https://...', 'http://...']));
        }
        $platformCampaignId = trim($platformCampaignId);
        if ($platformCampaignId === '' || !preg_match('/^[A-Za-z0-9]{1,40}$/', $platformCampaignId)) {
            throw new InvalidInputException($this->messages()->invalidValue('platformCampaignId', $platformCampaignId, ['an id from getPlatformCampaigns']));
        }
        $short = self::flag('shortLink', $shortLink);
        $qr = self::flag('dynamicQr', $dynamicQr);
        if ($qr && !$short) {
            throw new InvalidInputException($this->messages()->invalidValue('dynamicQr', '1', ['0 without shortLink=1']));
        }
        $values = array_filter([
            'source' => trim($source), 'medium' => trim($medium), 'content' => trim($content), 'term' => trim($keyword),
        ], static fn(string $v): bool => $v !== '');
        $website = $this->platformWebsite($idSite);

        return [
            'website_id' => $website['id'],
            'target_url' => $targetUrl,
            'campaign_id' => $platformCampaignId,
            'values' => (object) $values,
            'channel' => trim($channel) !== '' ? trim($channel) : null,
            'placement' => trim($placement) !== '' ? trim($placement) : null,
            'short_link' => $short,
            'dynamic_qr' => $qr,
        ];
    }

    /** 0 or 1 (also false, true, "0", "1"), else HTTP 400 naming the parameter */
    private static function flag(string $param, $value): bool
    {
        if ($value === true || $value === 1 || $value === '1' || $value === 'true') {
            return true;
        }
        if ($value === false || $value === 0 || $value === '0' || $value === 'false' || $value === '' || $value === null) {
            return false;
        }
        throw new InvalidInputException((new Messages())->invalidValue($param, (string) $value, ['0', '1']));
    }

    /** a platform campaign as the API answers it */
    private static function platformCampaign(array $c): array
    {
        return [
            'id' => (string) ($c['id'] ?? ''),
            'name' => (string) ($c['name'] ?? ''),
            'parameter' => (string) ($c['parameter'] ?? ''),
            'status' => (string) ($c['status'] ?? ''),
            'startsOn' => isset($c['starts_on']) ? (string) $c['starts_on'] : null,
            'endsOn' => isset($c['ends_on']) ? (string) $c['ends_on'] : null,
            'appUrl' => PlatformConfig::appLink($c['app_url'] ?? null),
        ];
    }

    /**
     * The workspace website of a Matomo website, or a 409 naming the workspace.
     *
     * @return array{id: string, name: string, url: string}
     * @throws PlatformError
     */
    private function platformWebsite(int $idSite): array
    {
        $service = StaticContainer::get(PlatformService::class);
        $urls = (array) \Piwik\Plugins\SitesManager\API::getInstance()->getSiteUrlsFromId($idSite);
        $website = $service->website($idSite, $urls, self::platformLanguage());
        if ($website === null) {
            throw new PlatformError('no_website', 0);
        }
        return $website;
    }

    private function platformError(PlatformError $e): \Exception
    {
        $connection = (new \Piwik\Plugins\FeinwerkCampaignManager\Platform\Store())->connection();
        return $this->messages()->platform($e, $connection !== null ? $connection->workspaceName : '');
    }

    private static function platformLanguage(): string
    {
        return self::userLanguage() === 'de' ? 'de' : 'en';
    }

    private static function userLanguage(): string
    {
        try {
            return (string) StaticContainer::get(\Piwik\Translation\Translator::class)->getCurrentLanguage();
        } catch (\Throwable $e) {
            return '';
        }
    }

    /**
     * Lists the parameter sets a link of this website can use and which parameter names Matomo reads, so a link is
     * built with names that end up in the reports.
     *
     * @param int $idSite website id (required)
     * @return array{sets: list<array{key: string, names: array<string, string>, read: array<string, bool>}>,
     *               defaultSet: string, fields: string[], mcrOnlyFields: string[], mcrActive: bool,
     *               lowercaseValues: bool} names: field => URL parameter name; read: field => whether Matomo stores the
     *               value of that parameter; mcrActive: whether Marketing Campaigns Reporting is active (needed for
     *               source, medium, content, campaignId, group and placement in the reports); lowercaseValues: whether
     *               values are saved in lower case (website option, changed with SitesManager.updateSite)
     */
    public function getParameterSets($idSite = null): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasViewAccess($idSite);
        $context = $this->context();
        $sets = $context->parameterSets();

        $out = [];
        foreach ($sets->available() as $set) {
            $read = [];
            foreach ($set->names() as $field => $name) {
                $read[$field] = $sets->isRead($field, $name);
            }
            $out[] = ['key' => $set->key(), 'names' => $set->names(), 'read' => $read];
        }
        return [
            'sets' => $out,
            'defaultSet' => 'utm',
            'fields' => Fields::ALL,
            'mcrOnlyFields' => Fields::MCR_ONLY,
            'mcrActive' => $sets->isMcrActive(),
            'lowercaseValues' => $context->lowercaseValues($idSite),
        ];
    }

    /**
     * Lists the channel templates of the builder: each prefills source and medium for a kind of channel.
     *
     * @param int $idSite website id (required)
     * @return list<array{key: string, label: string, source: string, medium: string, sources: string[]}> key: stable id
     *         (newsletter, social, paid_social, paid_search, display, partner, print, event); label: name in the
     *         user's language; source: '' when the person picks one; sources: suggested sources
     */
    public function getTemplates($idSite = null): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasViewAccess($idSite);
        $templates = [];
        foreach (Templates::defaults() as $template) {
            $templates[] = ['key' => $template['key'], 'label' => Piwik::translate('FeinwerkCampaignManager_Template_' . $template['key'])]
                + $template;
        }
        return $templates;
    }

    /**
     * Builds and checks a campaign link without saving it (the dry run of addLink). Use it to show the link and its
     * problems before saving.
     *
     * @param int $idSite website id (required)
     * @param string $targetUrl where the link leads, a full http or https URL; its query and fragment are kept; it must
     *                          not contain campaign parameters already
     * @param string $campaign campaign name (required, at most 255 characters)
     * @param string $parameterSet utm (default), mtm or own (only when getParameterSets lists it)
     * @param string $source source, e.g. newsletter (optional)
     * @param string $medium medium, e.g. email (optional)
     * @param string $keyword keyword or term (optional)
     * @param string $content content, e.g. which banner (optional)
     * @param string $campaignId campaign or link ID (optional; with Marketing Campaigns Reporting active, addLink
     *                           generates one when empty)
     * @param string $group campaign group (optional, read by Marketing Campaigns Reporting only)
     * @param string $placement placement (optional, read by Marketing Campaigns Reporting only)
     * @param int $idLink the saved link being edited (optional), so its own link ID is not reported as in use
     * @return array{valid: bool, url: ?string, parameterSet: string, params: list<array{field: string, name: string, value: string}>,
     *               values: array<string, string>, errors: list<array{field: string, code: string, message: string, details: array}>,
     *               warnings: list<array{field: string, code: string, message: string, details: array}>, existingIdLink: ?int,
     *               campaignIdOnSave: bool}
     *         url: the link, null while there are errors; values: the cleaned values that would be saved; errors (block
     *         saving): required, too_long, invalid_url, unsupported_scheme, has_campaign_parameters; warnings (saving
     *         is fine): host_not_in_site, near_duplicate, not_read; existingIdLink: the saved link with the same URL;
     *         campaignIdOnSave: whether addLink will add a generated link ID
     */
    public function previewLink(
        $idSite = null,
        string $targetUrl = '',
        string $campaign = '',
        string $parameterSet = 'utm',
        string $source = '',
        string $medium = '',
        string $keyword = '',
        string $content = '',
        string $campaignId = '',
        string $group = '',
        string $placement = '',
        $idLink = null
    ): array {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasViewAccess($idSite);
        $idLink = $idLink === null || $idLink === '' ? 0 : $this->intParam('idLink', $idLink, 1, PHP_INT_MAX);
        $service = $this->service();
        $checked = $service->check($idSite, $targetUrl, $parameterSet, self::values(
            $campaign, $source, $medium, $keyword, $content, $campaignId, $group, $placement
        ), $idLink);
        $same = $service->findSame($idSite, $checked);
        $messages = $this->messages();
        return [
            'valid' => $checked->isValid(),
            'url' => $checked->url,
            'parameterSet' => $checked->set->key(),
            'params' => $checked->params(),
            'values' => $checked->values,
            'errors' => $messages->describeAll($checked->errors),
            'warnings' => $messages->describeAll($checked->warnings),
            'existingIdLink' => $same === null ? null : (int) $same['idlink'],
            'campaignIdOnSave' => $same === null && $checked->values[Fields::ID] === '' && $this->context()->isMcrActive(),
        ];
    }

    /**
     * Saves a campaign link in the website's list. Saving the same link again returns the saved one (existed: true)
     * instead of a copy. Check it with previewLink first.
     *
     * @param int $idSite website id (required)
     * @param string $targetUrl see previewLink
     * @param string $campaign see previewLink
     * @param string $parameterSet see previewLink
     * @param string $source see previewLink
     * @param string $medium see previewLink
     * @param string $keyword see previewLink
     * @param string $content see previewLink
     * @param string $campaignId see previewLink
     * @param string $group see previewLink
     * @param string $placement see previewLink
     * @param string $startDate first day of use, YYYY-MM-DD (optional)
     * @param string $endDate last day of use, YYYY-MM-DD, not before startDate (optional)
     * @param string $note free text for the team, at most 1000 characters (optional)
     * @return array{link: array, existed: bool, warnings: list<array{field: string, code: string, message: string, details: array}>}
     *         link: the saved link (see getLink); existed: true when the same link was saved before (nothing changed);
     *         warnings: as in previewLink
     */
    public function addLink(
        $idSite = null,
        string $targetUrl = '',
        string $campaign = '',
        string $parameterSet = 'utm',
        string $source = '',
        string $medium = '',
        string $keyword = '',
        string $content = '',
        string $campaignId = '',
        string $group = '',
        string $placement = '',
        string $startDate = '',
        string $endDate = '',
        string $note = ''
    ): array {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasWriteAccess($idSite);
        $result = $this->service()->add(
            $idSite,
            $targetUrl,
            $parameterSet,
            self::values($campaign, $source, $medium, $keyword, $content, $campaignId, $group, $placement),
            $startDate,
            $endDate,
            $note,
            Piwik::getCurrentUserLogin(),
            Date::now()->getDatetime()
        );
        return [
            'link' => LinkPresenter::link($result['row']),
            'existed' => $result['existed'],
            'warnings' => $this->messages()->describeAll($result['checked']->warnings),
        ];
    }

    /**
     * Changes a saved link. Only the parameters given change; an empty value clears an optional field. The link is
     * built and checked again; a change that makes it equal to another saved link is refused. A live or ended link
     * (status in getLink) keeps its target URL, parameter set and campaign values: sending one of them with another
     * value answers HTTP 400 naming it (save a new link with addLink instead); the same value sent back is fine, and
     * note, startDate and endDate can still change.
     *
     * @param int $idSite website id (required)
     * @param int $idLink id of the saved link (required) (from getLinks or addLink)
     * @param string|null $targetUrl new target URL, see previewLink
     * @param string|null $campaign new campaign name (cannot be emptied)
     * @param string|null $parameterSet utm, mtm or own
     * @param string|null $source new source
     * @param string|null $medium new medium
     * @param string|null $keyword new keyword
     * @param string|null $content new content
     * @param string|null $campaignId new campaign or link ID; a given value replaces a generated one, except that very
     *                               generated ID sent back unchanged; '' clears it
     * @param string|null $group new group
     * @param string|null $placement new placement
     * @param string|null $startDate YYYY-MM-DD, '' clears it
     * @param string|null $endDate YYYY-MM-DD, '' clears it
     * @param string|null $note at most 1000 characters, '' clears it
     * @return array{link: array, warnings: list<array{field: string, code: string, message: string, details: array}>}
     *         the changed link (see getLink) and the warnings of its check
     */
    public function updateLink(
        $idSite = null,
        $idLink = null,
        ?string $targetUrl = null,
        ?string $campaign = null,
        ?string $parameterSet = null,
        ?string $source = null,
        ?string $medium = null,
        ?string $keyword = null,
        ?string $content = null,
        ?string $campaignId = null,
        ?string $group = null,
        ?string $placement = null,
        ?string $startDate = null,
        ?string $endDate = null,
        ?string $note = null
    ): array {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasWriteAccess($idSite);
        $idLink = $this->intParam('idLink', $idLink, 1, PHP_INT_MAX);
        $result = $this->service()->update(
            $idSite,
            $idLink,
            $targetUrl,
            $parameterSet,
            self::values($campaign, $source, $medium, $keyword, $content, $campaignId, $group, $placement),
            $startDate,
            $endDate,
            $note,
            Piwik::getCurrentUserLogin(),
            Date::now()->getDatetime()
        );
        return [
            'link' => LinkPresenter::link($result['row']),
            'warnings' => $result['checked'] === null ? [] : $this->messages()->describeAll($result['checked']->warnings),
        ];
    }

    /**
     * Archives a saved link: it leaves the active list but is kept (links are never deleted). Archiving an archived
     * link changes nothing.
     *
     * @param int $idSite website id (required)
     * @param int $idLink id of the saved link (required)
     * @return array the link after the change (see getLink)
     */
    public function archiveLink($idSite = null, $idLink = null): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasWriteAccess($idSite);
        $idLink = $this->intParam('idLink', $idLink, 1, PHP_INT_MAX);
        return LinkPresenter::link($this->service()->setArchived($idSite, $idLink, true, Piwik::getCurrentUserLogin(), Date::now()->getDatetime()));
    }

    /**
     * Brings an archived link back into the active list. Restoring an active link changes nothing.
     *
     * @param int $idSite website id (required)
     * @param int $idLink id of the saved link (required)
     * @return array the link after the change (see getLink)
     */
    public function restoreLink($idSite = null, $idLink = null): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasWriteAccess($idSite);
        $idLink = $this->intParam('idLink', $idLink, 1, PHP_INT_MAX);
        return LinkPresenter::link($this->service()->setArchived($idSite, $idLink, false, Piwik::getCurrentUserLogin(), Date::now()->getDatetime()));
    }

    /**
     * Returns one saved link.
     *
     * @param int $idSite website id (required)
     * @param int $idLink id of the saved link (required)
     * @return array{idLink: int, idSite: int, url: string, targetUrl: string, parameterSet: string,
     *               values: array<string, string>, campaignIdGenerated: bool, startDate: ?string, endDate: ?string,
     *               note: ?string, archived: bool, status: string, liveAt: ?string, liveSince: ?string,
     *               liveReason: ?string, createdBy: string, createdAt: string, updatedBy: string, updatedAt: string,
     *               archivedAt: ?string} url: the full link to share; values: field => value ('' when not set); status:
     *               draft (can change freely), live (marked live, start date reached, or its first visit counted;
     *               target and values are locked) or ended (live and the end date passed); liveAt: when it was
     *               recorded as live (null while live only by its start date); liveSince: the website's day it went
     *               live (YYYY-MM-DD); liveReason: manual (marked live), start (first day of use reached) or visit (first
     *               visit counted), null for a draft; times in ISO 8601 UTC. Reading a draft whose first visit Matomo has
     *               counted marks it live
     */
    public function getLink($idSite = null, $idLink = null): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasViewAccess($idSite);
        $idLink = $this->intParam('idLink', $idLink, 1, PHP_INT_MAX);
        $row = $this->service()->get($idSite, $idLink);
        return LinkPresenter::link($this->detector()->refresh($idSite, [$row], Date::now()->getDatetime())[0]);
    }

    /**
     * Marks a saved link live by hand (for example once it is printed or sent). A live link keeps its target URL,
     * parameter set and campaign values; its note and dates can still change, everything else goes into a new link
     * (addLink). Marking a live link again changes nothing; a link never goes back to draft.
     *
     * @param int $idSite website id (required)
     * @param int $idLink id of the saved link (required; HTTP 404 when it does not exist)
     * @return array the link after the change (see getLink)
     */
    public function markLinkLive($idSite = null, $idLink = null): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasWriteAccess($idSite);
        $idLink = $this->intParam('idLink', $idLink, 1, PHP_INT_MAX);
        return LinkPresenter::link($this->service()->markLive($idSite, $idLink, Piwik::getCurrentUserLogin(), Date::now()->getDatetime()));
    }

    /**
     * Lists the saved links of a website, newest change first.
     *
     * @param int $idSite website id (required)
     * @param string $status active (default), archived or all
     * @param string $search text searched in the target URL, the note and every value (case-insensitive)
     * @param int $limit links per page, 1 to 500, default 100
     * @param int $offset links to skip, default 0
     * @param int $idLink only this saved link (optional); an id that does not exist gives an empty list, not an error,
     *                    unlike getLink
     * @return array{total: int, limit: int, offset: int, links: list<array>} total: matching links; links: see getLink.
     *         Reading drafts whose first visit Matomo has counted marks them live (as getLink)
     */
    public function getLinks($idSite = null, string $status = 'active', string $search = '', $limit = 100, $offset = 0, $idLink = null): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasViewAccess($idSite);
        $status = trim($status);
        if (!in_array($status, LinkService::STATUSES, true)) {
            throw new InvalidInputException($this->messages()->invalidValue('status', $status, LinkService::STATUSES));
        }
        $limit = $this->intParam('limit', $limit, 1, 500);
        $offset = $this->intParam('offset', $offset, 0, PHP_INT_MAX);
        $idLink = $idLink === null || $idLink === '' ? null : $this->intParam('idLink', $idLink, 1, PHP_INT_MAX);
        $found = $this->service()->find($idSite, $status, $search, $limit, $offset, $idLink);
        $rows = $this->detector()->refresh($idSite, $found['rows'], Date::now()->getDatetime());
        return [
            'total' => $found['total'],
            'limit' => $limit,
            'offset' => $offset,
            'links' => array_map([LinkPresenter::class, 'link'], $rows),
        ];
    }

    /**
     * Visits, conversions and revenue of saved links for a period, from Matomo's archived reports. Takes the same
     * filters and paging as getLinks and answers for exactly the links of that page. A link is counted by its link ID
     * while Marketing Campaigns Reporting is active (exact), otherwise by the row of its campaign and keyword, or of its
     * campaign alone, in Matomo's campaign report; such a row also counts every other link with the same values.
     *
     * @param int $idSite website id (required)
     * @param string $period day, week, month, year or range (required), as in Matomo's reports
     * @param string $date the date of the period, as in Matomo's reports (e.g. today, 2026-11-01, or
     *                     2026-11-01,2026-11-30 for a range) (required)
     * @param string $segment a Matomo segment (optional, all visits when empty)
     * @param string $status active (default), archived or all, as in getLinks
     * @param string $search as in getLinks
     * @param int $limit links per page, 1 to 500, default 100
     * @param int $offset links to skip, default 0
     * @param int $idLink only this saved link (optional)
     * @return list<array{idLink: int, basis: string, sharedWith: int, visits: int, conversions: int, revenue: float}>
     *         in the order of getLinks; basis: link_id (exact, the link's ID in Marketing Campaigns Reporting's report),
     *         campaign_keyword or campaign (the row in Matomo's campaign report); sharedWith: how many saved links are
     *         counted by that row (1 = only this link; more: the numbers are those of all of them); revenue in the
     *         website's currency
     */
    public function getLinkResults($idSite = null, string $period = '', string $date = '', string $segment = '', string $status = 'active', string $search = '', $limit = 100, $offset = 0, $idLink = null): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasViewAccess($idSite);
        // Matomo 6 no longer trims request parameters: words compared with a list or passed on are trimmed here
        [$period, $date, $segment] = [trim($period), trim($date), trim($segment)];
        $status = trim($status);
        $this->checkPeriod($idSite, $period, $date);
        if (!in_array($status, LinkService::STATUSES, true)) {
            throw new InvalidInputException($this->messages()->invalidValue('status', $status, LinkService::STATUSES));
        }
        $limit = $this->intParam('limit', $limit, 1, 500);
        $offset = $this->intParam('offset', $offset, 0, PHP_INT_MAX);
        $idLink = $idLink === null || $idLink === '' ? null : $this->intParam('idLink', $idLink, 1, PHP_INT_MAX);
        $found = $this->service()->find($idSite, $status, $search, $limit, $offset, $idLink);
        return StaticContainer::get(LinkResults::class)->forRows($idSite, $found['rows'], $period, $date, $segment);
    }

    /**
     * Suggests values for one field while someone types: the values the website's saved links use, most used first;
     * for the campaign field then also the campaign values Matomo counted in the last 30 days that no saved link uses
     * yet (most visits first; spelling variants of saved values left out).
     *
     * @param int $idSite website id (required)
     * @param string $field campaign, source, medium, keyword, content, group or placement
     * @param string $query text the value must contain (case-insensitive); '' lists the most used values
     * @param int $limit at most this many values, 1 to 100, default 20
     * @return list<array{value: string, links: int, source: string, visits: int}> links: how many active saved links
     *         use the value; source: links (a saved link uses it) or report (only counted by Matomo); visits: visits of
     *         the last 30 days for report values, 0 for the others
     */
    public function getSuggestions($idSite = null, string $field = '', string $query = '', $limit = 20): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasViewAccess($idSite);
        $field = trim($field);
        if (!in_array($field, self::SUGGESTION_FIELDS, true)) {
            throw new InvalidInputException($this->messages()->invalidValue('field', $field, self::SUGGESTION_FIELDS));
        }
        $limit = $this->intParam('limit', $limit, 1, 100);
        $query = mb_strtolower(trim($query), 'UTF-8');
        $matches = static fn(string $value): bool => $query === '' || mb_strpos(mb_strtolower($value, 'UTF-8'), $query, 0, 'UTF-8') !== false;
        $out = [];
        $known = $this->service()->knownValues($idSite)[$field] ?? [];
        foreach ($known as $value => $links) {
            $value = (string) $value;
            if ($matches($value)) {
                $out[] = ['value' => $value, 'links' => (int) $links, 'source' => 'links', 'visits' => 0];
            }
        }
        if ($field === Fields::CAMPAIGN && count($out) < $limit) {
            foreach (StaticContainer::get(Suggestions::class)->countedCampaigns($idSite, array_map('strval', array_keys($known))) as $value => $visits) {
                // a campaign value of digits only ("2025") comes back as an int array key: the API answers text
                $value = (string) $value;
                if ($matches($value)) {
                    $out[] = ['value' => $value, 'links' => 0, 'source' => 'report', 'visits' => $visits];
                }
            }
        }
        return array_slice($out, 0, $limit);
    }

    /**
     * Lists the website's campaigns with their phase, numbers for a period, goal progress and warnings: every campaign
     * with saved details, with active saved links, and the campaign values Matomo counted in the period (those without
     * details or links at most 20, most visits first). Numbers come from Matomo's archived campaign report.
     *
     * @param int $idSite website id (required)
     * @param string $period day, week, month, year or range (required), as in Matomo's reports
     * @param string $date the date of the period, as in Matomo's reports (e.g. today, 2026-11-01, or 2026-11-01,2026-11-30
     *                     for a range) (required)
     * @param string $segment a Matomo segment (optional, all visits when empty)
     * @param string $status active (default: not archived), archived or all
     * @return list<array{campaign: string, name: ?string, phase: string, source: string, hasDetails: bool,
     *               activeLinks: int, linkStates: array{draft: int, live: int, ended: int}, startDate: ?string,
     *               endDate: ?string, notes: ?string,
     *               period: array{visits: int, conversions: int, revenue: float}, recentVisits: int,
     *               goal: ?array{metric: string, target: float, idGoal: ?int, value: float, progress: ?float, from: string,
     *               to: string, complete: bool}, warnings: string[]}>
     *         campaign: the campaign value (lower case, the key); phase: preparing (start in the future, or saved links
     *         without visits yet), running (started and not ended, or visits in the last 30 days), ended, archived;
     *         source: details, links or report (only counted by Matomo); linkStates: its active saved links per status
     *         (see getLink); period: numbers of the requested period;
     *         recentVisits: visits of the last 30 days; goal: progress from the start (at most the last 92 days, complete
     *         false when the start lies before) to the end or today; warnings: no_visits_since_start (running, started
     *         at least 2 days ago, no visit since). Sorted: running, preparing, ended, archived, then by visits.
     */
    public function getCampaigns($idSite = null, string $period = '', string $date = '', string $segment = '', string $status = 'active'): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasViewAccess($idSite);
        // Matomo 6 no longer trims request parameters: words compared with a list or passed on are trimmed here
        [$period, $date, $segment] = [trim($period), trim($date), trim($segment)];
        $status = trim($status);
        $this->checkPeriod($idSite, $period, $date);
        if (!in_array($status, Overview::STATUSES, true)) {
            throw new InvalidInputException($this->messages()->invalidValue('status', $status, Overview::STATUSES));
        }
        return $this->campaigns()->overview($idSite, $period, $date, $segment, $status);
    }

    /**
     * Finds campaign data problems of a period on the Datenqualität page: spelling variants (campaign values Matomo
     * counts apart although they probably mean one campaign: the same apart from case and separators, or one typing
     * error apart) and campaign values Matomo counted that no saved link and no campaign details explain. Matomo cannot
     * merge variants afterwards; the suggested spelling is the one to use from now on. Numbers from Matomo's archived
     * campaign report.
     *
     * @param int $idSite website id (required)
     * @param string $period day, week, month, year or range (required), as in Matomo's reports
     * @param string $date the date of the period, as in Matomo's reports (e.g. today, 2026-11-01, or
     *                     2026-11-01,2026-11-30 for a range) (required)
     * @param string $segment a Matomo segment (optional, all visits when empty)
     * @return array{variants: list<array{suggested: string, visits: int, values: list<array{value: string, visits: int,
     *         conversions: int, savedLinks: int, hasDetails: bool}>}>, unexplained: list<array{value: string,
     *         visits: int, conversions: int}>, counts: array{variants: int, unexplained: int, unexplainedVisits: int,
     *         campaignVisits: int}}
     *         variants: groups of two or more values, most visits first; suggested: the spelling to keep (most saved
     *         links, then most visits), first in its group; savedLinks: active saved links with the value; hasDetails:
     *         the value has campaign details; unexplained: at most 50, most visits first (counts has them all);
     *         campaignVisits: all campaign visits of the period; values in lower case as Matomo counts them
     */
    public function getQualityIssues($idSite = null, string $period = '', string $date = '', string $segment = ''): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasViewAccess($idSite);
        // Matomo 6 no longer trims request parameters: words compared with a list or passed on are trimmed here
        [$period, $date, $segment] = [trim($period), trim($date), trim($segment)];
        $this->checkPeriod($idSite, $period, $date);
        return StaticContainer::get(QualityIssues::class)->find($idSite, $period, $date, $segment);
    }

    /**
     * The campaign page: one campaign over its own days, independent of a selected period. The days run from its start
     * date, or else its first visit in the days that can be read, to its end date or today, at most 92 days (complete
     * false when the campaign began before them); a campaign that has not started has no days yet. Numbers from Matomo's
     * archived campaign report per day (cron archiving is enough).
     *
     * @param int $idSite website id (required)
     * @param string $campaign the campaign value as used in links (any case; required, HTTP 400 when empty)
     * @param string $segment a Matomo segment (optional, all visits when empty)
     * @return array{campaign: array, window: array{from: string, to: string, complete: bool}, totals: array{visits: int,
     *         conversions: int, revenue: float}, series: list<array{day: string, visits: int, conversions: int,
     *         revenue: float}>, links: list<array{link: array, results: ?array, lastVisitDay: ?string}>,
     *         warnings: list<array{code: string, idLink: int, lastVisitDay: string}>} campaign: as getCampaign (HTTP 404
     *         when the value has no details, no active saved link and no visit in its days; reading marks drafts of the
     *         campaign live whose first visit Matomo has counted, as getLinks); series: one entry per day of
     *         the window; links: its active saved links (as getLink) with their numbers over the same days (as
     *         getLinkResults) and, for links counted by a link ID no other saved link carries, the last day with a visit
     *         (all visits, whatever segment); warnings: link_quiet (such a live link with no visit for 5 days)
     */
    public function getCampaignResults($idSite = null, string $campaign = '', string $segment = ''): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasViewAccess($idSite);
        return StaticContainer::get(CampaignResults::class)->find($idSite, $campaign, trim($segment), Date::now()->getDatetime());
    }

    /**
     * Returns one campaign as getCampaigns lists it, for any campaign value of the website.
     *
     * @param int $idSite website id (required)
     * @param string $campaign the campaign value as used in links (any case; required)
     * @param string $period see getCampaigns (required)
     * @param string $date see getCampaigns (required)
     * @param string $segment see getCampaigns
     * @return array one row of getCampaigns; HTTP 404 when the value has no details, no active saved link and no visits
     *               in the period
     */
    public function getCampaign($idSite = null, string $campaign = '', string $period = '', string $date = '', string $segment = ''): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasViewAccess($idSite);
        // Matomo 6 no longer trims request parameters: words compared with a list or passed on are trimmed here
        [$period, $date, $segment] = [trim($period), trim($date), trim($segment)];
        $this->checkPeriod($idSite, $period, $date);
        return $this->campaigns()->one($idSite, $campaign, $period, $date, $segment);
    }

    /**
     * Saves details for a campaign value: a display name, the period it runs, a goal and notes. A campaign value that
     * has details already returns them (existed: true) instead of a second copy.
     *
     * @param int $idSite website id (required)
     * @param string $campaign the campaign value as used in links (required; stored cleaned and lower case)
     * @param string $name display name, e.g. "Autumn sale 2026" (optional, at most 255 characters)
     * @param string $startDate first day, YYYY-MM-DD (optional; decides the phase and the start of goal progress)
     * @param string $endDate last day, YYYY-MM-DD, not before startDate (optional)
     * @param string $goalMetric none (default), visits, conversions or revenue
     * @param float $goalTarget the number to reach for goalMetric (optional, at least 0; revenue in the website's
     *                          currency)
     * @param int $idGoal count conversions or revenue of this Matomo goal only (optional, a goal of the website)
     * @param string $notes free text for the team (optional, at most 2000 characters)
     * @return array{campaign: array, existed: bool} campaign: the saved details (see updateCampaign)
     */
    public function addCampaign($idSite = null, string $campaign = '', string $name = '', string $startDate = '', string $endDate = '', string $goalMetric = 'none', $goalTarget = null, $idGoal = null, string $notes = ''): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasWriteAccess($idSite);
        $result = $this->campaigns()->add($idSite, $campaign, $name, $startDate, $endDate, $goalMetric, $goalTarget, $idGoal, $notes, Piwik::getCurrentUserLogin(), Date::now()->getDatetime());
        return ['campaign' => CampaignPresenter::details($result['row']), 'existed' => $result['existed']];
    }

    /**
     * Changes the details of a campaign. Only the parameters given change; an empty value clears one.
     *
     * @param int $idSite website id (required)
     * @param string $campaign the campaign value (required; HTTP 404 when it has no details)
     * @param string|null $name see addCampaign
     * @param string|null $startDate see addCampaign
     * @param string|null $endDate see addCampaign
     * @param string|null $goalMetric see addCampaign
     * @param float|null $goalTarget see addCampaign
     * @param int|null $idGoal see addCampaign
     * @param string|null $notes see addCampaign
     * @return array{campaign: string, name: ?string, startDate: ?string, endDate: ?string,
     *               goal: ?array{metric: string, target: ?float, idGoal: ?int}, notes: ?string, archived: bool,
     *               createdBy: string, createdAt: string, updatedBy: string, updatedAt: string, archivedAt: ?string}
     *         the details after the change, times in ISO 8601 UTC
     */
    public function updateCampaign($idSite = null, string $campaign = '', ?string $name = null, ?string $startDate = null, ?string $endDate = null, ?string $goalMetric = null, $goalTarget = null, $idGoal = null, ?string $notes = null): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasWriteAccess($idSite);
        return CampaignPresenter::details($this->campaigns()->update($idSite, $campaign, [
            'name' => $name, 'start_date' => $startDate, 'end_date' => $endDate, 'goal_metric' => $goalMetric,
            'goal_target' => $goalTarget, 'idgoal' => $idGoal, 'notes' => $notes,
        ], Piwik::getCurrentUserLogin(), Date::now()->getDatetime()));
    }

    /**
     * Archives the details of a campaign: it leaves the active overview but is kept. Archiving twice changes nothing.
     *
     * @param int $idSite website id (required)
     * @param string $campaign the campaign value (required; HTTP 404 when it has no details)
     * @return array the details after the change (see updateCampaign)
     */
    public function archiveCampaign($idSite = null, string $campaign = ''): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasWriteAccess($idSite);
        return CampaignPresenter::details($this->campaigns()->setArchived($idSite, $campaign, true, Piwik::getCurrentUserLogin(), Date::now()->getDatetime()));
    }

    /**
     * Brings archived campaign details back into the active overview.
     *
     * @param int $idSite website id (required)
     * @param string $campaign the campaign value (required; HTTP 404 when it has no details)
     * @return array the details after the change (see updateCampaign)
     */
    public function restoreCampaign($idSite = null, string $campaign = ''): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasWriteAccess($idSite);
        return CampaignPresenter::details($this->campaigns()->setArchived($idSite, $campaign, false, Piwik::getCurrentUserLogin(), Date::now()->getDatetime()));
    }

    /**
     * Tells what the website still lacks for campaign work: Matomo goals (for conversions), a saved link, campaign
     * details, and the recommended free plugin Marketing Campaigns Reporting (without it Matomo keeps only the campaign
     * name and keyword of a visit, not its source, medium or content).
     *
     * @param int $idSite website id (required)
     * @return array{complete: bool, items: list<array{key: string, done: bool, count: int, required: bool}>} keys:
     *         goals, marketing_campaigns_reporting, saved_link, campaign_details; count: how many exist; required: false
     *         for a recommended step (marketing_campaigns_reporting); complete: every required step is done
     */
    public function getSetupChecklist($idSite = null): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserHasViewAccess($idSite);
        return $this->campaigns()->checklist($idSite);
    }

    /**
     * Sends a thumbs-up or thumbs-down for one of the plugin's questions to Feinwerk (the plugin's maker). The Matomo
     * server sends it, never the browser: plugin, versions, question, vote, browser family and interface language,
     * nothing about the user or the website. Off with feedback = 0 in [FeinwerkCampaignManager] of config.ini.php, with
     * Matomo's internet features off, and in Matomo's test mode.
     *
     * @param int $idSite website id the question was shown for (required; view access)
     * @param string $topic the question: overview (end of the overview), link_builder (end of the link builder),
     *                      saved_links (end of the list), data_quality (end of the data quality page) or
     *                      campaign_pages (end of All campaigns and the campaign pages)
     * @param string $vote up or down
     * @return array{sent: bool} sent: whether the vote left this Matomo (false when switched off, within 10 seconds of the
     *         user's last vote on the same question, above 20 votes a minute for this Matomo, or when the store did not
     *         take it; never an error for the user)
     */
    public function sendFeedback($idSite = null, string $topic = '', string $vote = ''): array
    {
        $idSite = $this->idSite($idSite);
        Piwik::checkUserIsNotAnonymous();
        Piwik::checkUserHasViewAccess($idSite);
        $topic = trim($topic);
        $vote = trim($vote);
        if (!in_array($topic, PluginFeedback::TOPICS, true)) {
            throw new InvalidInputException($this->messages()->invalidValue('topic', $topic, PluginFeedback::TOPICS));
        }
        if (!in_array($vote, ['up', 'down'], true)) {
            throw new InvalidInputException($this->messages()->invalidValue('vote', $vote, ['up', 'down']));
        }
        if (!PluginFeedback::enabled()) {
            return ['sent' => false];
        }
        $payload = PluginFeedback::payload(
            $topic,
            $vote,
            (string) PluginManager::getInstance()->getLoadedPlugin(PluginFeedback::PLUGIN)->getVersion(),
            Version::VERSION,
            (string) ($_SERVER['HTTP_USER_AGENT'] ?? ''),
            (string) StaticContainer::get(Translator::class)->getCurrentLanguage()
        );
        // one vote per user and question in 10 seconds, at most PluginFeedback::SERVER_CAP a minute per server
        $key = PluginFeedback::throttleOption(Piwik::getCurrentUserLogin(), $topic);
        if (time() - (int) Option::get($key) < 10) {
            return ['sent' => false];
        }
        $server = PluginFeedback::countVote((string) Option::get(PluginFeedback::SERVER_OPTION), time());
        if ($server === null) {
            return ['sent' => false];
        }
        Option::set($key, (string) time());
        Option::set(PluginFeedback::SERVER_OPTION, $server);
        return ['sent' => (new PluginFeedback())->send($payload)];
    }

    /** @return array<string, ?string> field => value as given (null = not given) */
    private static function values(?string $campaign, ?string $source, ?string $medium, ?string $keyword, ?string $content, ?string $campaignId, ?string $group, ?string $placement): array
    {
        return [
            Fields::CAMPAIGN => $campaign,
            Fields::SOURCE => $source,
            Fields::MEDIUM => $medium,
            Fields::KEYWORD => $keyword,
            Fields::CONTENT => $content,
            Fields::ID => $campaignId,
            Fields::GROUP => $group,
            Fields::PLACEMENT => $placement,
        ];
    }

    /** a website id: a positive whole number, otherwise HTTP 400 (access is checked right after) */
    private function idSite($value): int
    {
        return $this->intParam('idSite', $value, 1, PHP_INT_MAX);
    }

    /**
     * A whole number parameter. The int parameters are untyped in the signatures on purpose: Matomo's API proxy answers
     * a typed int that is not a number with a plain error (HTTP 200); this answers HTTP 400 naming the parameter.
     */
    private function intParam(string $name, $value, int $min, int $max): int
    {
        $text = is_int($value) ? (string) $value : (is_string($value) ? trim($value) : '');
        if (!preg_match('/^-?\d{1,18}$/', $text)) {
            throw new InvalidInputException($this->messages()->notANumber($name, is_scalar($value) ? (string) $value : gettype($value)));
        }
        $int = (int) $text;
        if ($int < $min || $int > $max) {
            throw new InvalidInputException($this->messages()->outOfRange($name, $int, $min, $max));
        }
        return $int;
    }

    /** period and date as Matomo's reports take them, otherwise HTTP 400 naming both */
    private function checkPeriod(int $idSite, string $period, string $date): void
    {
        $allowed = ['day', 'week', 'month', 'year', 'range'];
        if (!in_array($period, $allowed, true)) {
            throw new InvalidInputException($this->messages()->invalidValue('period', $period, $allowed));
        }
        try {
            if (trim($date) === '') {
                throw new \InvalidArgumentException('date');
            }
            // a range is only checked when its dates are read: read them here, not later inside a report
            $built = \Piwik\Period\Factory::build($period, $date, Site::getTimezoneFor($idSite));
            $built->getDateStart();
            $built->getDateEnd();
        } catch (\Throwable $e) {
            throw new InvalidInputException($this->messages()->invalidPeriodDate($period, $date));
        }
    }

    private function campaigns(): CampaignService
    {
        return StaticContainer::get(CampaignService::class);
    }

    private function detector(): LinkLiveDetector
    {
        return StaticContainer::get(LinkLiveDetector::class);
    }

    private function service(): LinkService
    {
        return StaticContainer::get(LinkService::class);
    }

    private function context(): InstanceContext
    {
        return StaticContainer::get(InstanceContext::class);
    }

    private function messages(): Messages
    {
        return StaticContainer::get(Messages::class);
    }
}
