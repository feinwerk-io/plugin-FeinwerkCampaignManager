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
 * Invalid input to the API: HTTP 400. Not core's BadRequestException: on Matomo 5.0.0 its constructor drops the code,
 * so the status would stay 200 there. HttpCodeException exists from 5.0.0.
 */
final class InvalidInputException extends \Exception implements HttpCodeException
{
    public function __construct(string $message)
    {
        // Matomo's own Ajax calls (force_api_session=1, this plugin's pages) keep HTTP 200 with {result: error}:
        // Matomo 5.0 to 6.0 replace the text of any error status there with "Something went wrong"
        parent::__construct($message, self::isOwnUiRequest() ? 0 : 400);
    }

    private static function isOwnUiRequest(): bool
    {
        return (int) ($_POST['force_api_session'] ?? $_GET['force_api_session'] ?? 0) === 1;
    }
}
