__Is Campaign Manager free?__

Yes. Campaign Manager is free and licensed under the GPL v3 or later. Admins and super users see a short tip on other Feinwerk offers at the end of its pages; one line in Matomo's configuration file switches it off.

__What does Campaign Manager add to Matomo's own campaign reports?__

Matomo counts campaigns once visits with campaign parameters arrive. Campaign Manager helps before and after that: it builds consistent links, saves them for the whole team and gives each campaign a period, a goal and notes. The overview shows all campaigns by phase with goal progress, and the data quality page finds spelling variants that Matomo counts as separate campaigns.

__Where do I find it?__

Under Campaigns › Overview for every website you can view. The same menu has All campaigns, the Link builder, Saved links and Data quality.

__Where do the numbers come from?__

All visits, conversions and revenue come from Matomo's own campaign report and, when active, from Marketing Campaigns Reporting. Campaign Manager reads the archived reports, so the usual archiving by cron job is enough.

__Do I need the Marketing Campaigns Reporting plugin?__

No, Campaign Manager works without it. With that free plugin, Matomo also stores source, medium, content, group, placement and a link ID, so each saved link is counted on its own. Without it the links of a campaign share their numbers, which is why the overview recommends the plugin.

__What do draft, live and ended mean?__

A new link is a draft and can change freely. It is live once you mark it live, its first day of use is reached or Matomo counts its first visit; from then on its target and campaign values stay, so its numbers stay comparable. After its last day of use it is ended.

__Where is my data stored?__

Saved links and campaign details stay in your Matomo database. Without a connection to Feinwerk Campaigns, the only thing that leaves your Matomo is a feedback vote when someone clicks a thumb. Connected, your Matomo server calls the platform with the connection's access key to read the workspace's convention and campaigns and to create campaigns, links, short links and QR codes; no visitor data is sent.

__Which Matomo versions and permissions does Campaign Manager need?__

Matomo 5.0 or later and Matomo 6, light and dark mode, in English, German, French, Spanish and Italian. With view access to a website you can build and copy links and see the numbers; saving and changing them needs write access.

__Can I connect it to Feinwerk Campaigns?__

Yes, optionally. A super user connects this Matomo to a workspace of the Feinwerk Campaigns platform under Administration, Platform, Feinwerk Campaigns. Connected, the link builder creates links in the workspace with its campaigns and naming convention, with a short link and a dynamic QR code. Without a connection everything else works the same.

__Can I use it through the API or an AI assistant?__

Yes. Everything the pages do is also available through Matomo's HTTP API, module FeinwerkCampaignManager. Invalid input answers with HTTP 400 and a message that names the parameter and the allowed values.
