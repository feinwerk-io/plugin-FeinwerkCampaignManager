<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Link;

/**
 * How many saved links one report row counts. A campaign row counts every link of that campaign, whatever its keyword
 * or link ID (their visits land in it as well); a keyword row every link with that campaign and keyword; a link ID row
 * the links with that ID.
 */
final class LinkShares
{
    /** @var array<string, int> LinkBasis id() => links */
    private $counts = [];

    /**
     * @param iterable<array{campaign: string, keyword: string, campaign_id: string}> $links the website's active links
     */
    public function __construct(iterable $links)
    {
        foreach ($links as $link) {
            $campaign = LinkBasis::label((string) $link['campaign']);
            $keyword = LinkBasis::label((string) $link['keyword']);
            $id = LinkBasis::label((string) $link['campaign_id']);
            $this->add(LinkBasis::CAMPAIGN . ':' . $campaign);
            if ($keyword !== '') {
                $this->add(LinkBasis::CAMPAIGN_KEYWORD . ':' . LinkBasis::pair($campaign, $keyword));
            }
            if ($id !== '') {
                $this->add(LinkBasis::LINK_ID . ':' . $id);
            }
        }
    }

    /** links counted by the basis' row (0 when none of the active links is) */
    public function count(LinkBasis $basis): int
    {
        return $this->counts[$basis->id()] ?? 0;
    }

    private function add(string $id): void
    {
        $this->counts[$id] = ($this->counts[$id] ?? 0) + 1;
    }
}
