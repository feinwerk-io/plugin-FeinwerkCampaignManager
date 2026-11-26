<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager;

use Piwik\Common;
use Piwik\Container\StaticContainer;
use Piwik\Nonce;
use Piwik\Piwik;
use Piwik\Plugin\Manager as PluginManager;
use Piwik\Notification;
use Piwik\Plugins\FeinwerkCampaignManager\ConnectorInstaller\ConnectorInstaller;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformConfig;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformService;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\Store;
use Piwik\Plugins\UsersManager\Model as UsersModel;
use Piwik\Url;
use Piwik\View;

/**
 * The admin page of the connection to Feinwerk Campaigns with its connect start and return, and the Feinwerk kit's
 * Connector installer pages; the campaign pages come as widgets (Widgets/).
 */
class Controller extends \Piwik\Plugin\Controller
{
    public const CONNECT_NONCE = 'FeinwerkCampaignManager.connect';

    /**
     * Administration > Platform > Feinwerk Campaigns: the connection (Vue PlatformConnection reads its status through
     * the API). Super users only; hidden with platform = 0.
     */
    public function platform()
    {
        Piwik::checkUserHasSuperUserAccess();
        if (!PlatformConfig::enabled()) {
            throw new \Piwik\Exception\Exception(Piwik::translate('FeinwerkCampaignManager_PlatformDisabled'));
        }
        // a return that waited for the sign-in (Matomo may send the super user elsewhere after it): finish it here
        $resumed = StaticContainer::get(PlatformService::class)->resumeReturn(Piwik::getCurrentUserLogin(), time(), \Piwik\Date::now()->getDatetime());
        if ($resumed !== null) {
            $this->notifyReturn($resumed);
            Url::redirectToUrl('index.php?module=FeinwerkCampaignManager&action=platform');

            return '';
        }
        $view = new View('@FeinwerkCampaignManager/platform');
        $this->setBasicVariablesView($view);
        \Piwik\Plugin\ControllerAdmin::setBasicVariablesAdminView($view);
        $view->connectNonce = Nonce::getNonce(self::CONNECT_NONCE, 3600);
        $view->connectAction = 'index.php?module=FeinwerkCampaignManager&action=connectStart';
        $view->wordPress = PlatformConfig::isWordPress();
        $view->language = ConnectorInstaller::pageLanguage();

        return $view->render();
    }

    /**
     * The click on "Connect": a form with the connect request that sends itself to the platform (contract §1.1), with
     * a visible button for browsers without JavaScript. POST with the page's nonce; super users only.
     */
    public function connectStart()
    {
        Piwik::checkUserHasSuperUserAccess();
        if (!PlatformConfig::enabled() || PlatformConfig::isWordPress()) {
            Url::redirectToUrl('index.php?module=FeinwerkCampaignManager&action=platform');

            return '';
        }
        Nonce::checkNonce(self::CONNECT_NONCE, Common::getRequestVar('nonce', '', 'string', $_POST));
        $login = Piwik::getCurrentUserLogin();
        $email = '';
        try {
            $user = (new UsersModel())->getUser($login);
            $email = is_array($user) ? (string) ($user['email'] ?? '') : '';
        } catch (\Throwable $e) {
            // no prefill then
        }
        $lang = ConnectorInstaller::pageLanguage() === 'de' ? 'de' : 'en';
        try {
            $start = StaticContainer::get(PlatformService::class)->connectStart(
                Url::getCurrentUrlWithoutFileName(),
                $login,
                // Matomo knows no person's name, only the login: nothing rather than a wrong prefill
                '',
                $email,
                $lang,
                time()
            );
        } catch (\InvalidArgumentException $e) {
            $this->notify('error', Piwik::translate('FeinwerkCampaignManager_PlatformBadMatomoUrl'));
            Url::redirectToUrl('index.php?module=FeinwerkCampaignManager&action=platform');

            return '';
        }
        self::browserCookie($start['browser'], Store::PENDING_SECONDS);
        $view = new View('@FeinwerkCampaignManager/connectStart');
        $this->setBasicVariablesView($view);
        \Piwik\Plugin\ControllerAdmin::setBasicVariablesAdminView($view);
        $view->connectForm = $start;
        // the page in the user's language; $lang (de or en) is only for the platform
        $view->language = ConnectorInstaller::pageLanguage();

        return $view->render();
    }

    /**
     * The return from the platform (contract §1.3): code and state, or error and state. The state was stored at the
     * start for this login; the code is exchanged server side; then on to the clean admin page, so code and state
     * leave the address bar and no Referer carries them.
     */
    public function connectReturn()
    {
        header('Referrer-Policy: no-referrer');
        $service = StaticContainer::get(PlatformService::class);
        $state = Common::getRequestVar('state', '', 'string');
        $code = Common::getRequestVar('code', '', 'string');
        // the return reached the starting browser without its Matomo session (it expired during the consent): keep the
        // code for the pending start its state and the browser's cookie prove, then on to Matomo's sign-in at a clean
        // address; signed in, the same action (or the admin page) finishes it within the code's 10 minutes. Any other
        // browser gets Matomo's sign-in and keeps nothing.
        $browser = $_COOKIE[Store::BROWSER_COOKIE] ?? '';
        if (Piwik::isUserIsAnonymous() && $state !== '' && $code !== '' && is_string($browser)
            && StaticContainer::get(Store::class)->attachCode($state, $code, $browser, time())
        ) {
            Url::redirectToUrl('index.php?module=FeinwerkCampaignManager&action=connectReturn&resume=1');

            return '';
        }
        Piwik::checkUserHasSuperUserAccess();
        if ($state === '' && Common::getRequestVar('resume', 0, 'int') === 1) {
            $result = $service->resumeReturn(Piwik::getCurrentUserLogin(), time(), \Piwik\Date::now()->getDatetime())
                ?? ['result' => 'expired', 'error' => '', 'workspace' => ''];
        } else {
            $result = $service->connectReturn(
                $state,
                $code,
                Common::getRequestVar('error', '', 'string'),
                Piwik::getCurrentUserLogin(),
                time(),
                \Piwik\Date::now()->getDatetime()
            );
        }
        $this->notifyReturn($result);
        self::browserCookie('', -1);
        Url::redirectToUrl('index.php?module=FeinwerkCampaignManager&action=platform');

        return '';
    }

    /** @param array{result: string, error: string, workspace: string} $result */
    private function notifyReturn(array $result): void
    {
        switch ($result['result']) {
            case 'connected':
                $this->notify('success', Piwik::translate('FeinwerkCampaignManager_PlatformConnected', [$result['workspace']]));
                break;
            case 'denied':
                $this->notify('info', Piwik::translate('FeinwerkCampaignManager_PlatformDenied'));
                break;
            case 'expired':
                $this->notify('warning', Piwik::translate('FeinwerkCampaignManager_PlatformStartAgain'));
                break;
            default:
                $this->notify('error', Piwik::translate('FeinwerkCampaignManager_PlatformConnectFailed', [$result['error'] ?: 'unknown']));
        }
    }

    /**
     * The QR code of a saved link made in Feinwerk Campaigns, fetched with the connection's token on the server (so it
     * never reaches the browser) and sent as a download. idSite, idLink, format svg (default), png, pdf or eps; view
     * access to the website.
     */
    public function platformQr()
    {
        $idSite = Common::getRequestVar('idSite', 0, 'int');
        // not for the anonymous user of a public site: every download reaches the platform on the connection's limit
        Piwik::checkUserIsNotAnonymous();
        Piwik::checkUserHasViewAccess($idSite);
        $format = Common::getRequestVar('format', 'svg', 'string');
        if (!in_array($format, ['svg', 'png', 'pdf', 'eps'], true)) {
            throw new \Piwik\Exception\Exception(Piwik::translate('FeinwerkCampaignManager_ApiErrorAllowedValues', ['format', $format, 'svg, png, pdf, eps']));
        }
        $link = StaticContainer::get(\Piwik\Plugins\FeinwerkCampaignManager\Model\LinkService::class)->get($idSite, Common::getRequestVar('idLink', 0, 'int'));
        if (empty($link['platform_link_id']) || empty($link['platform_qr'])) {
            throw new \Piwik\Exception\Exception(Piwik::translate('FeinwerkCampaignManager_PlatformNoQr'));
        }
        try {
            $file = StaticContainer::get(PlatformService::class)->qr((string) $link['platform_link_id'], $format);
        } catch (\Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformError $e) {
            throw new \Piwik\Exception\Exception((new \Piwik\Plugins\FeinwerkCampaignManager\Model\Messages())->platform($e)->getMessage());
        }
        $types = ['svg' => 'image/svg+xml', 'png' => 'image/png', 'pdf' => 'application/pdf', 'eps' => 'application/postscript'];
        $name = preg_replace('/[^A-Za-z0-9_-]+/', '-', (string) $link['campaign']) ?: 'link';
        Common::sendHeader('Content-Type: ' . $types[$format]);
        Common::sendHeader('Content-Disposition: attachment; filename="qr-' . $name . '-' . (int) $link['idlink'] . '.' . $format . '"');
        Common::sendHeader('X-Content-Type-Options: nosniff');
        // an SVG opened directly must not run anything
        Common::sendHeader("Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'");

        return $file['body'];
    }

    /**
     * The starting browser's cookie (Store::BROWSER_COOKIE): only for Matomo's path, never readable by scripts, sent with
     * the platform's top-level return (SameSite Lax); an empty value with a negative lifetime removes it.
     */
    private static function browserCookie(string $value, int $seconds): void
    {
        if (headers_sent()) {
            return;
        }
        $path = parse_url(Url::getCurrentUrlWithoutFileName(), PHP_URL_PATH);
        setcookie(Store::BROWSER_COOKIE, $value, [
            'expires' => $seconds > 0 ? time() + $seconds : 1,
            'path' => is_string($path) && $path !== '' ? $path : '/',
            'secure' => \Piwik\ProxyHttp::isHttps(),
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
    }

    private function notify(string $context, string $message): void
    {
        $notification = new Notification($message);
        $notification->context = $context;
        $notification->type = Notification::TYPE_TRANSIENT;
        Notification\Manager::notify('FeinwerkCampaignManager_platform', $notification);
    }

    /**
     * Kit: the Feinwerk Connector installer page (ConnectorInstaller/ConnectorInstaller.php). Super users only.
     */
    public function connectorInstaller()
    {
        Piwik::checkUserHasSuperUserAccess();
        $env = ConnectorInstaller::environment();
        $redirect = ConnectorInstaller::redirectFor($env);
        if ($redirect !== null) {
            Url::redirectToUrl($redirect);

            return '';
        }

        return $this->renderConnectorInstaller($env, null);
    }

    /**
     * Kit: the click. Matomo's password check first (it comes back here by GET with these parameters), then the nonce
     * (verified and discarded, as Matomo's own install action does), then install when the files are missing, and
     * activate. Success: on to the connector; any failure: back on the page with Matomo's reason.
     */
    public function connectorInstallerRun()
    {
        Piwik::checkUserHasSuperUserAccess();
        $env = ConnectorInstaller::environment();
        $redirect = ConnectorInstaller::redirectFor($env);
        if ($redirect !== null) {
            // active: the connector; switched off: admin home (never the page's "open the connector" fallback)
            Url::redirectToUrl($redirect);

            return '';
        }
        $state = ConnectorInstaller::decide($env);
        if ($state !== ConnectorInstaller::INSTALL && $state !== ConnectorInstaller::ACTIVATE) {
            return $this->renderConnectorInstaller($env, null);
        }

        $nonce = Common::getRequestVar('nonce', '', 'string');
        $retry = Common::getRequestVar('retry', 0, 'int') === 1;
        $verified = StaticContainer::get(\Piwik\Plugins\Login\PasswordVerifier::class)->requirePasswordVerifiedRecently([
            'module' => ConnectorInstaller::PLUGIN,
            'action' => 'connectorInstallerRun',
            'nonce' => $nonce,
            'retry' => $retry ? 1 : 0,
        ]);
        if (!$verified) {
            // Matomo is sending the user to its password page (it returns only when its redirect is off)
            return '';
        }

        $nonceError = Nonce::verifyNonceWithErrorMessage(ConnectorInstaller::NONCE, $nonce);
        if ($nonceError !== '') {
            // An expired nonce or Matomo's referrer check (seen right after its password step, e.g. after an SSO login):
            // nothing is installed, the page comes back with a fresh button and a short note. A second failure in a row
            // has a lasting cause (proxy, trusted host, origin): then Matomo's own reason, which may hold its FAQ link.
            return $retry
                ? $this->renderConnectorInstaller($env, ['ok' => false, 'message' => $nonceError, 'html' => true])
                : $this->renderConnectorInstaller($env, null, true);
        }
        Nonce::discardNonce(ConnectorInstaller::NONCE);

        $result = ConnectorInstaller::run(
            ConnectorInstaller::usableFiles($env),
            static function (): void {
                (new \Piwik\Plugins\CorePluginsAdmin\PluginInstaller())->installOrUpdatePluginFromMarketplace(ConnectorInstaller::CONNECTOR);
            },
            static function (): void {
                PluginManager::getInstance()->activatePlugin(ConnectorInstaller::CONNECTOR);
            }
        );
        if ($result['ok']) {
            Url::redirectToUrl(ConnectorInstaller::CONNECTOR_URL);
        }

        return $this->renderConnectorInstaller(ConnectorInstaller::environment(), $result);
    }

    /**
     * @param array<string, bool> $env
     * @param array{ok: bool, message: string, html: bool}|null $result
     * @param bool $clickAgain the nonce no longer matched: a fresh button and a short note
     */
    private function renderConnectorInstaller(array $env, ?array $result, bool $clickAgain = false): string
    {
        $view = new View('@FeinwerkCampaignManager/connectorInstaller');
        // an admin page without a website: setGeneralVariablesView() needs idSite (the menu entry is reached from
        // admin pages without one); the admin variables also send X-Frame-Options as enable_framed_settings says
        $this->setBasicVariablesView($view);
        \Piwik\Plugin\ControllerAdmin::setBasicVariablesAdminView($view);
        $state = ConnectorInstaller::decide($env);
        $view->installerState = $state;
        $view->installerError = $result !== null && !$result['ok'] ? $result : null;
        $view->installerNonce = $state === ConnectorInstaller::INSTALL || $state === ConnectorInstaller::ACTIVATE
            ? Nonce::getNonce(ConnectorInstaller::NONCE)
            : '';
        $view->installerLinks = ConnectorInstaller::manualLinks();
        $view->installerWordPressUrl = ConnectorInstaller::wordpressUrl();
        $view->installerConnectorUrl = ConnectorInstaller::CONNECTOR_URL;
        $view->installerPhpFloor = ConnectorInstaller::PHP_FLOOR;
        $view->installerPluginsAdmin = $env['pluginsAdmin'];
        $view->installerConsoleCommand = ConnectorInstaller::CONSOLE_COMMAND;
        $view->installerClickAgain = $clickAgain;
        // <html lang> and piwik.language: setBasicVariablesView() does not set them on this page
        $view->language = ConnectorInstaller::pageLanguage();

        return $view->render();
    }
}
