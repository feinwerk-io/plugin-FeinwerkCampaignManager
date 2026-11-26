# Feinwerk Campaign Manager

## Description

**Build clean campaign links for every website, keep them in one list and find them again.**

Campaign links decide how Matomo reports your newsletters, social posts, ads and printed flyers. One typo, one
capital letter or one forgotten parameter, and a campaign splits into several rows or disappears in "Direct entry".
Feinwerk Campaign Manager builds every link in Matomo itself and checks it while you type.

- **All campaigns at a glance:** the overview groups them by phase (running, in preparation, ended) with visits,
  conversions and revenue for the period you pick, progress towards a goal, and a warning when a campaign brings no
  visit after its start.
- **Campaign details:** give a campaign a display name, a period, a goal (visits, conversions or revenue, also of one
  Matomo goal) and notes for your team.
- **A link in three steps:** where the link leads, where you share it (newsletter, social media, search ads, print and
  more) and which campaign it belongs to. Source and medium are filled in from the channel you pick.
- **Checked while you type:** the link is built right away. You see when the target is not one of the website's
  addresses, when it already carries campaign parameters, when Matomo would not store a value, and when another saved
  link already carries the link ID you typed.
- **Consistent spelling:** values you already use are one click away, campaign values Matomo counted in the last 30
  days follow them (marked with a dashed frame), and a value that is almost the same as an existing one ("Newsletter",
  "news-letter", "newsleter") gets a hint with the existing spelling, so Matomo counts both together.
- **The right parameter names:** utm (read by Matomo and other tools), mtm, or the names your Matomo is configured for.
- **One list for the whole team:** saved links are shared by everyone with access to the website, with search, notes,
  dates of use, copy, edit and archive, and with the visits and conversions of each link.
- **Draft, live, ended:** a link changes freely until it goes live; then its values stay, so its numbers stay
  comparable. The list says since when and why a link is live.
- **A page per campaign:** preparation, progress and result of each campaign, with Matomo's own evolution graph and a
  one-page summary for decision makers to print or save as PDF.
- **Data quality:** spelling variants that Matomo counts as separate campaigns, with the spelling to keep, and the
  campaign values that no saved link explains.
- **Ready for Marketing Campaigns Reporting:** with that free plugin active, the builder offers group, placement and a
  link ID, so each saved link can be counted on its own. Without it Matomo keeps only the campaign name and keyword of
  a link, so the overview recommends it.
- **Next to Matomo's own URL builder:** Matomo's Campaign URL Builder stays as it is; one line under it leads to the
  link builder.
- **Light and dark mode, in English, German, French, Spanish and Italian.**

**Works with Feinwerk Campaign Score (free):** Campaign Score rates the campaign values already in Matomo; Campaign
Manager keeps new links clean from the start.

**Get started:** open *Campaigns › Overview* for a website.

**More Plugins for Matomo by Feinwerk:** install [Feinwerk Connector](https://plugins.matomo.org/FeinwerkMarketplaceConnector)
from the Matomo Marketplace to discover, install and update all Feinwerk plugins, free and paid, right in your Matomo.
Documentation: [plugins.feinwerk.io](https://plugins.feinwerk.io/en/plugins/FeinwerkCampaignManager).

## Requirements

- Matomo 5.0 or later (Matomo 5 and Matomo 6), PHP 8.1 or later
- Versions: one version 5.x of this plugin for Matomo 5 and Matomo 6
- Optional: the free plugin Marketing Campaigns Reporting, so Matomo also stores source, medium, content, group,
  placement and link ID (without it, Matomo stores only the campaign name and the keyword)

## Installation

With one click through the Feinwerk connector (**Administration → Feinwerk Plugins → Discover**) or as a ZIP
file, see [Installing plugins](https://plugins.feinwerk.io/en/docs/installing-plugins). To install the ZIP
by hand, copy the folder to `plugins/FeinwerkCampaignManager` and activate it under
**Administration → Plugins → Manage Plugins** or on the command line:

```
./console plugin:activate FeinwerkCampaignManager
```

## Usage

### Campaigns › Overview

Every campaign of the website by phase: running, in preparation and ended. A campaign appears when it has details, a
saved link, or visits in the selected period. Campaign values Matomo counted without details or saved link (the 20
with the most visits) come last in their own group **Only counted in Matomo**, closed while planned campaigns exist. Each card shows visits, conversions and revenue for the period and segment selected at the top,
the period of the campaign, its saved links and, with a goal, the progress since the start (the overview looks back 92
days at most). A running campaign without a visit two days after its start gets a warning.

**New campaign** and **Edit details** open a panel for the campaign value, a display name, start and end, a goal and
notes. **New link** opens the link builder with the campaign filled in, **Analyse in Matomo** opens Matomo's visitor
log with the campaign as segment (it shows the visits themselves, so it works without archiving segments). **First steps** lists what the website still lacks: Matomo goals, a saved link,
campaign details, and the recommended free plugin Marketing Campaigns Reporting. Once the required steps are done, only
the recommendation stays, as one line, until the plugin is active.

The phase: a start date in the future means in preparation, an end date in the past ended, a start date otherwise
running. Without a start date a campaign runs when it had visits in the last 30 days, and is in preparation when it
has saved links but no visits yet.

### Campaigns › All campaigns

A table of the website's campaigns for the period selected at the top: status, period, visits, conversions, goal and
the saved links per status. Each campaign opens its own page, over its own days (from its start, or its first visit,
to its end or today, at most 92 days), whatever period is selected:

- **Preparation:** key data (period, campaign value, goal, notes), a start checklist and the campaign's saved links
  with their status.
- **Progress:** visits, conversions and revenue against the goal, the share of the time passed, warnings (no visit
  since the start, a live link with a link ID of its own quiet for 5 days), Matomo's own evolution graph of the campaign (of Marketing Campaigns Reporting's campaign report while that plugin is active) and
  the numbers per link.
- **Result:** reached, exceeded or missed (or an interim result while it runs), the best and the weakest link where
  links are counted by a link ID of their own, notes and learnings, and links into Matomo's visitor log with the campaign as
  segment (and into devices, pages and goals where Matomo archives segments on request).

**Summary for decision makers** shows the result on one page to print or save as PDF.

### Campaigns › Link builder

1. **Where does the link lead?** Enter the full address of the page, starting with `https://`. Its own query and
   anchor are kept. An address that already contains campaign parameters is refused: the link gets its own.
2. **Where do you share it?** Pick a channel. It fills in source and medium; for social media, print and similar
   channels pick or type the source.
3. **Which campaign does it belong to?** Type the campaign name or click one you already use.

The link appears under **Your link** with a copy button. **Save link** keeps it in the website's list; saving the same
link again finds the saved one instead of making a copy. **More fields, dates and note** holds keyword, content, the
parameter names, the first and last day of use and a note for your team.

Who may do what: everyone with view access to a website builds and copies links and sees the list; write access is
needed to save, change and archive.

### Campaigns › Links

Every saved link of the website, newest change first. Search by campaign, source, target address or note, show active
or archived links, copy a link again, open it in the builder to change it, or archive it. Links are never deleted;
archived links can be restored. **Results** shows the visits and conversions of each link for the period selected
at the top. With Marketing Campaigns Reporting and a link ID no other saved link carries they are exactly the link's;
otherwise Matomo counts by campaign (and keyword) or by the shared link ID, so links with the same values share their
numbers, and the list says how many links that are.
The overview and Matomo's campaign report show the numbers per campaign; the list links both.

**Draft, live, ended.** A new link is a draft: everything can change. It is live once you mark it live (in the link
builder), once its first day of use is reached, or at the latest when Matomo counts its first visit (with a link ID the
builder generated; with a typed link ID or by campaign only when no other saved link uses the same values and they had
no visits in the 30 days before the link was saved). A live link keeps its target and campaign values, so its numbers stay together: the note and the days of use
can still change, everything else goes into a new link (**Use the values for a new link**). After its last day of use it is ended.

### Campaigns › Data quality

Matomo counts every spelling of a campaign value as a campaign of its own: "newsletter-november",
"newsletter_november" and "newsleter-november" are three campaigns, and their numbers cannot be merged afterwards.
**Spelling variants** shows such groups among the values of the selected period and the saved links (the same apart
from case and separators, or one typing error apart), with the recommended spelling first (the one most saved links
use, then the most visits) and **New link** with it. **Without a saved link** lists the campaign values Matomo counted
in the period that no saved link and no campaign details explain, most visits first, with **New link** and
**Analyse in Matomo**.

### Connection to Feinwerk Campaigns (optional)

A super user connects this Matomo to a workspace of the Feinwerk Campaigns platform under *Administration › Platform ›
Feinwerk Campaigns*: sign in there (or create an account), choose the workspace, confirm. Connected, the link builder
gets a second step **Create in Feinwerk Campaigns**: pick or create a campaign of the workspace, add a short link and a
dynamic QR code, and the link is made in the workspace with its naming convention, live at once and also kept in the
list of saved links here, with its short link and the QR code as SVG, PNG, PDF or EPS. Each page shows **Open in
Feinwerk Campaigns**. **Disconnect** on the same admin page ends the connection; saved links and campaign details stay.
Without a connection the plugin works as described above and contacts nobody. To hide everything about the connection:

```ini
[FeinwerkCampaignManager]
platform = 0
```

In Matomo for WordPress the connection is not available yet.

### Website option

**Save campaign values in lower case** (on by default; Administration › Websites › Manage, in the website's form):
Matomo usually stores campaign names and keywords in lower case, so the links use the same spelling.

## API

Everything the pages do is also available through Matomo's HTTP API, module `FeinwerkCampaignManager` (for scripts and AI
assistants). Reading needs view access to the website, saving and changing write access. Invalid input answers with
HTTP 400 and a message that names the parameter and the allowed values; an unknown link ID answers with HTTP 404.
Send changes as POST requests.

| Method | What it does | Example |
|---|---|---|
| `getCampaigns` | The campaigns by phase with numbers for a period, goal progress and warnings; while connected also the campaigns of the Feinwerk Campaigns workspace for this website | `method=FeinwerkCampaignManager.getCampaigns&idSite=1&period=month&date=today` |
| `getCampaign` | One campaign as getCampaigns lists it | `method=FeinwerkCampaignManager.getCampaign&idSite=1&campaign=autumn-sale&period=month&date=today` |
| `addCampaign` | Saves details for a campaign value, or returns the saved ones | `method=FeinwerkCampaignManager.addCampaign&idSite=1&campaign=autumn-sale&name=Autumn%20sale&startDate=2026-10-01&goalMetric=visits&goalTarget=5000` |
| `updateCampaign` | Changes the given details; an empty value clears one | `method=FeinwerkCampaignManager.updateCampaign&idSite=1&campaign=autumn-sale&endDate=2026-10-31` |
| `archiveCampaign` | Moves campaign details to the archived campaigns | `method=FeinwerkCampaignManager.archiveCampaign&idSite=1&campaign=autumn-sale` |
| `restoreCampaign` | Brings archived campaign details back | `method=FeinwerkCampaignManager.restoreCampaign&idSite=1&campaign=autumn-sale` |
| `markLinkLive` | Marks a saved link live, so its target and campaign values stay as they are | `method=FeinwerkCampaignManager.markLinkLive&idSite=1&idLink=7` |
| `getLinkResults` | Visits, conversions and revenue of the saved links of one list page for a period, with how each link is counted | `method=FeinwerkCampaignManager.getLinkResults&idSite=1&period=month&date=today&status=active&limit=100&offset=0` |
| `getCampaignResults` | One campaign over its own days: totals, a daily series, its links with their numbers, warnings | `method=FeinwerkCampaignManager.getCampaignResults&idSite=1&campaign=autumn-sale-2026` |
| `getQualityIssues` | Spelling variants and campaign values without a saved link for a period | `method=FeinwerkCampaignManager.getQualityIssues&idSite=1&period=month&date=today` |
| `getSetupChecklist` | What the website still lacks for campaign work (required steps and the recommended Marketing Campaigns Reporting) | `method=FeinwerkCampaignManager.getSetupChecklist&idSite=1` |
| `getConnectionStatus` | Whether this Matomo is connected to the Feinwerk Campaigns platform and which platform features work | `method=FeinwerkCampaignManager.getConnectionStatus` |
| `disconnectPlatform` | Ends the connection to Feinwerk Campaigns (super users); saved links and their short links stay | `method=FeinwerkCampaignManager.disconnectPlatform` |
| `getPlatformConvention` | The workspace website this Matomo site belongs to and its naming convention (connected, write access) | `method=FeinwerkCampaignManager.getPlatformConvention&idSite=1` |
| `getPlatformCampaigns` | The workspace campaigns of this site's website, with search (connected, write access) | `method=FeinwerkCampaignManager.getPlatformCampaigns&idSite=1&query=autumn&limit=20` |
| `addPlatformCampaign` | Creates a campaign draft in the workspace, or returns the existing one (connected, write access) | `method=FeinwerkCampaignManager.addPlatformCampaign&idSite=1&name=Autumn%20sale&startDate=2026-10-01` |
| `previewPlatformLink` | Builds and checks a link with the workspace's convention without creating it (connected, write access) | `method=FeinwerkCampaignManager.previewPlatformLink&idSite=1&targetUrl=https%3A%2F%2Fexample.com%2F&platformCampaignId=CAMP1&source=newsletter&medium=email&shortLink=1` |
| `addPlatformLink` | Creates the link in the workspace, live at once, with a short link and QR code when asked, and keeps it in the saved links (connected, write access) | `method=FeinwerkCampaignManager.addPlatformLink&idSite=1&targetUrl=https%3A%2F%2Fexample.com%2F&platformCampaignId=CAMP1&source=newsletter&medium=email&shortLink=1&dynamicQr=1` |
| `getParameterSets` | The parameter names a link can use here and which ones Matomo stores | `method=FeinwerkCampaignManager.getParameterSets&idSite=1` |
| `getTemplates` | The channel templates of the builder | `method=FeinwerkCampaignManager.getTemplates&idSite=1` |
| `previewLink` | Builds and checks a link without saving it | `method=FeinwerkCampaignManager.previewLink&idSite=1&targetUrl=https%3A%2F%2Fexample.com%2F&campaign=autumn-sale&source=newsletter&medium=email` |
| `addLink` | Saves a link, or returns the saved one when it exists | `method=FeinwerkCampaignManager.addLink&idSite=1&targetUrl=https%3A%2F%2Fexample.com%2F&campaign=autumn-sale&source=newsletter&medium=email&note=November` |
| `updateLink` | Changes the given fields of a saved link; an empty value clears one. A live link only changes its note and days of use | `method=FeinwerkCampaignManager.updateLink&idSite=1&idLink=7&medium=social` |
| `archiveLink` | Moves a link to the archived links | `method=FeinwerkCampaignManager.archiveLink&idSite=1&idLink=7` |
| `restoreLink` | Brings an archived link back | `method=FeinwerkCampaignManager.restoreLink&idSite=1&idLink=7` |
| `getLink` | One saved link | `method=FeinwerkCampaignManager.getLink&idSite=1&idLink=7` |
| `getLinks` | The saved links, with search, status and paging; with `idLink` just that link (an empty list when it does not exist) | `method=FeinwerkCampaignManager.getLinks&idSite=1&status=active&search=newsletter&limit=100&offset=0` |
| `getSuggestions` | Values of one field the website's links already use, most used first | `method=FeinwerkCampaignManager.getSuggestions&idSite=1&field=source&query=news` |
| `sendFeedback` | Sends a thumbs-up or thumbs-down for one of the plugin's questions to Feinwerk (see Feedback and support) | `method=FeinwerkCampaignManager.sendFeedback&idSite=1&topic=link_builder&vote=up` |

The website option above is changed with Matomo's own `SitesManager.updateSite`, for example
`method=SitesManager.updateSite&idSite=1&settingValues[FeinwerkCampaignManager][0][name]=lowercase_values&settingValues[FeinwerkCampaignManager][0][value]=0`,
and read back with `getParameterSets` (`lowercaseValues`).

## Your data

Saved links and campaign details stay in your Matomo database (tables `fw_campaigns_link` and `fw_campaigns_campaign`).
Without a connection to Feinwerk Campaigns, the only thing that leaves your Matomo is a feedback vote when someone clicks
a thumb (next section).

When a super user connects, their browser sends the Feinwerk Campaigns platform the address of this Matomo, a return
address, a check value and, to prefill sign-in or sign-up, their e-mail address and the websites of this Matomo (id,
name and addresses). After the confirmation your Matomo server keeps the connection's access key (in Matomo's options
table, never in the browser) and calls the platform with it only: for the connection's status, the workspace's websites,
naming convention and campaigns, to create campaigns and links with short links and QR codes, and to download QR codes.
No visitor data and no Matomo access token go to the platform. What the platform keeps is described in its privacy
policy (section on the Matomo plugin).

## Feedback and support

At the end of the overview, the link builder, the list of saved links and the data quality page you can tell us with
one click whether they help you.
Your vote goes from your Matomo server to Feinwerk together with the plugin and Matomo version, your browser family
and the interface language, nothing else. To switch the question off:

```ini
[FeinwerkCampaignManager]
feedback = 0
```

**Support** next to it opens the [Feinwerk contact form](https://feinwerk.io/en/contact?service=plugins).

## Tips from Feinwerk

Below that question, users with admin access to at least one website and super users see one short line with a tip on
another Feinwerk offer, for example the Feinwerk Campaigns platform or Matomo hosting. It appears only in Matomo's
interface, never in API results, exports, email reports or embedded widgets, and never for a Feinwerk plugin you
already have installed. "×" hides a tip for 30 days in your browser. The tips are part of the plugin: nothing is loaded
from outside and nothing is sent. Links to Feinwerk pages open in a new tab and carry only the campaign parameters
`mtm_campaign`, `mtm_source` and `mtm_content`; the tip on the Feinwerk Connector opens its installer under
Administration or Matomo's Marketplace (super users) or plugins.matomo.org (other administrators), and super users get
no tip on it where Matomo cannot install from its Marketplace. To switch the tips off for this plugin, add to
`config/config.ini.php`:

```ini
[FeinwerkCampaignManager]
promotions = 0
```

`promotions = 0` in the section `[FeinwerkMarketplaceConnector]` switches them off for all Feinwerk plugins.

## Installing the Feinwerk Connector

The free Feinwerk Connector installs, updates and licenses Feinwerk plugins inside Matomo. The easiest way to get it is
the Matomo Marketplace. While it is not active, super users also find a section "Feinwerk Plugins" in Matomo's
Administration with the entry "Install Feinwerk Connector" ("Activate Feinwerk Connector" when its files are already
there). One click installs it from the Matomo Marketplace and activates it; as with every plugin install, Matomo first
asks for your password. Where Matomo cannot install from its Marketplace (Marketplace, internet features or plugin
administration switched off), the page explains the manual way instead. In Matomo for WordPress the connector is
installed as a WordPress plugin through Matomo Analytics, Marketplace. The connector needs PHP 8.1. Nothing is
downloaded before you click. To hide the entry, add to `config/config.ini.php`:

```ini
[FeinwerkCampaignManager]
connector_installer = 0
```

The same line in the section `[FeinwerkMarketplaceConnector]` hides it for all Feinwerk plugins.

## License

GPL v3 or later, see `LICENSE`.

## Author

Peter Boehlke, [Feinwerk.io](https://feinwerk.io) · support@feinwerk.io
