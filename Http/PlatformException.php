<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Http;

use Piwik\Http\HttpCodeException;

/**
 * A platform feature that cannot be used now, or a platform answer passed on: 409 when the connection does not allow
 * it (not connected, trial ended, connection lost, blocked, switched off, no matching website), 400 for input the
 * platform refused, 429 for its rate limit, 502 when it does not answer. The code word (reason) leads the message, so
 * scripts and AI clients can tell the cases apart. Matomo's own Ajax calls keep HTTP 200, as InvalidInputException.
 */
final class PlatformException extends \Exception implements HttpCodeException
{
    public function __construct(public readonly string $reason, string $message, int $status)
    {
        parent::__construct($message, self::isOwnUiRequest() ? 0 : $status);
    }

    private static function isOwnUiRequest(): bool
    {
        return (int) ($_POST['force_api_session'] ?? $_GET['force_api_session'] ?? 0) === 1;
    }
}
