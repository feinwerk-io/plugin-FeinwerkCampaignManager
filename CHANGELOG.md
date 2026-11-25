# Changelog

## 5.0.1

- Listed on the Matomo Marketplace: the plugin's website link in Matomo leads to its page on plugins.feinwerk.io, with
  screenshots and answers to frequent questions.

## 5.0.0

- First version: the reporting category Campaigns with the overview, the link builder and the list of saved links.
- The overview shows every campaign by phase (running, in preparation, ended) with visits, conversions and revenue for
  the selected period, goal progress since the start and a warning when a running campaign brings no visit. Campaign
  details (display name, period, goal, notes) are added and changed in a side panel. Campaign values that only Matomo
  counted come last in their own group, closed while planned campaigns exist.
- First steps on the overview: Matomo goals, a saved link and campaign details, plus the recommended free plugin
  Marketing Campaigns Reporting with a link to its page in the Marketplace.
- The link builder suggests the campaign values your saved links use and those Matomo counted in the last 30 days.
- The link builder builds a campaign link in three steps (target, channel, campaign) and checks it while you type:
  whether the target belongs to the website, whether it already carries campaign parameters, whether Matomo stores
  every value, whether a value is almost the same as one you already use, and whether another saved link already
  carries the link ID.
- Saved links are shared by everyone with access to the website, with search, notes, dates of use, copy, edit, archive
  and restore. Saving the same link again finds the saved one. Each link shows its visits and conversions for the
  selected period: exactly per link with Marketing Campaigns Reporting and a link ID, otherwise shared by the links of
  the same campaign. The list links the overview and Matomo's campaign report for the numbers per campaign.
- Saved links are drafts until they go live: marked live (with a short confirmation, also offered right after copying
  a draft), first day of use reached, or their first visit counted; the list and the builder say since when and why. A
  live link keeps its target and campaign values so its numbers stay comparable; note and days of use still change, and
  "Use the values for a new link" starts a new draft from them. Campaign cards count their links per status.
- All campaigns: a table of the campaigns and one page per campaign with the tabs Preparation, Progress and Result,
  Matomo's own evolution graph, the numbers per link and a summary for decision makers to print.
- Data quality page: spelling variants Matomo counts as separate campaigns, with the recommended spelling, and the
  campaign values of the period that no saved link explains.
- One line under Matomo's own Campaign URL Builder leads to the link builder.
- Parameter names utm, mtm or the names this Matomo is configured for; with Marketing Campaigns Reporting active also
  group, placement and a link ID per saved link.
- Website option to save campaign values in lower case (on by default).
- Every function is available through the API module `FeinwerkCampaignManager`.
- At the end of every page a one-line question with thumbs up and down and a Support link; the Matomo server sends the
  vote, `feedback = 0` switches it off.
- Below that question, administrators see a one-line tip on another Feinwerk offer, for example the Feinwerk
  Campaigns platform or Matomo hosting; "×" hides it for 30 days and `promotions = 0` switches it off. Nothing is
  loaded from outside.
- Super users find "Install Feinwerk Connector" under Administration while the free Feinwerk Connector is not active:
  one click installs and activates it through Matomo's Marketplace; `connector_installer = 0` hides the entry.
- Matomo 5.0 or later and Matomo 6, light and dark mode, in English, German, French, Spanish and Italian.
