# Changelog

## 5.3.0

- What the connection to Feinwerk Campaigns adds is easier to see: the admin page compares Matomo alone with the
  platform, the link builder shows what short links and QR codes would give, and Data quality points to the naming
  convention. Only for users with admin access; `promotions = 0` switches it off.
- The admin page lists which website of this Matomo belongs to which website of the workspace, with a link to each
  one's link builder (new API method `getPlatformWebsites`).
- Campaign page: the campaign's numbers stand above the tabs, the heading leads back to All campaigns, New link is the
  main action and the rest sits in a small menu.
- All campaigns: sortable columns, a revenue column, empty columns left out, values only Matomo counted folded at the
  end.
- New campaign while connected: the name comes first and the workspace forms the value unless you set it yourself;
  Add details keeps the campaign value as it is.
- Saved links: the short link of a platform link as a small label, QR code and the link in Feinwerk Campaigns as small
  actions; "Link sent?" right under its link; Reset filters when a search finds nothing.
- Link builder while connected: the short link comes first in the result, New link after creating, a question before a
  new workspace campaign; editing a platform link shows its short link and QR code; the link type stands before Your
  link in both modes.
- Workspace campaigns show their real status in Feinwerk Campaigns (draft, ready, live, paused and so on) instead of a
  phase derived from their period, and while one is not live, "Start in Feinwerk Campaigns" opens it there.
- Data quality no longer takes two known campaigns for spelling variants of each other.
- Smaller: future start dates read "from" and carry the year, Data quality says why a spelling is recommended and no
  longer repeats its values, "Summary" without naming an audience, New link only for users who can save links.

## 5.2.0

- Connected to Feinwerk Campaigns, the overview and All campaigns also show the campaigns of the workspace for this
  website, with their name, dates and phase, and open them in Feinwerk Campaigns. Your own campaign details stay in
  this Matomo and take precedence.
- Connected, "New campaign" also creates the campaign in the workspace; goal and note stay in this Matomo. The
  campaign value may stay empty there: Feinwerk Campaigns forms it from the name, following the naming convention.
- The link builder offers the connection only under the link type, no longer also in the line above the page.

## 5.1.0

- Connection to Feinwerk Campaigns (optional): a super user connects this Matomo to a workspace under Administration,
  Platform, Feinwerk Campaigns. Connected, the link builder creates links in the workspace with its campaigns and naming
  convention, with a short link and a dynamic QR code; it asks first, because the link is live at once. The links are
  kept in the list of saved links, where Copy takes the short link, and the QR code downloads as SVG, PNG, PDF or EPS.
  Each page shows the connection and opens the workspace; a lost or blocked connection says so. Without a connection
  the link builder shows short link and QR code as needing one, and nothing is sent anywhere. `platform = 0` hides
  everything about it. Uninstalling the plugin ends the connection.

## 5.0.2

- With Marketing Campaigns Reporting active, a campaign page no longer fails with an error: its evolution graph uses
  that plugin's campaign report, because the plugin replaces Matomo's own.
- The link builder works again when a campaign value consists of digits only (for example 2025).
- "Analyse in Matomo" opens Matomo's visitor log with the campaign as segment, which works without archiving segments.
  The result of a campaign links devices, pages and goals only where Matomo archives segments on request.

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
