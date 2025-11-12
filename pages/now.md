---
layout: page
title: Now
permalink: /now/
last_modified_at: 2025-11-12
description: What I'm up to these days.
---
<div id="postDate" data-post-date="{{ site.posts.first.date | date: '%Y-%m-%dT%H:%M:%SZ' }}"></div>
{% assign currently_reading = site.data.books | where: "category", "Presently Reading" | first %}

<script src="/assets/js/timediff.js"></script>
<script src="/assets/js/current-date.js"></script>

"Now" being what I'm up to *nowadays*[^1]; for *right now* (i.e., <span id="current-date">Loading...</span>), skip ahead to [today](/today/).

[^1]: H/t to <a href="https://sive.rs/" target="_blank">Derek Sivers</a> for this <a href="https://nownownow.com/about" target="_blank">now page concept</a>.

- **[Living](/domiciles/)** in [San Francisco](/sf/) for some <span id="TimeinSF"></span> now with my beautiful family{% if site.data.swarm %}—most recently spotted at [{{ site.data.swarm.venue }}]({{ site.data.swarm.url }}) via [Swarm](https://swarmapp.com/).{% endif %}
- **[Growing](/bio/)** a SaaS biz / digital products portfolio (product marketing / GTM) [@VarianMedSys](https://x.com/VarianMedSys)
- **[Writing](/posts/)** across a smörgåsbord of topics—most recently [*{{ site.posts.first.title }}*]({{ site.posts.first.url }}), posted <span id="timeDifferenceInline"></span>
- **[Reading](/books/)** *{{ currently_reading.title }}* by {{ currently_reading.author }}
- **[Learning](/learning/)** {{ site.data.learning.current.first.endeavour }}{% if site.data.learning.current[1] %}, {{ site.data.learning.current[1].endeavour | strip_html }}{% endif %}, etc.
- **[Riding](/cycling/)** and **[running](/running/)**—barely enough to stay in shape[^2]{% if site.data.strava %}—with last recorded [{{ site.data.strava.type | downcase }}]({{ site.data.strava.url }}) on {{ site.data.strava.date | date: "%b %-d" }}: {{ site.data.strava.distance }}km, {{ site.data.strava.elevation }}m gain via [Strava](https://www.strava.com/athletes/berenzino/){% endif %}
- **[Cooking](/recipes/)** up one of these {{ site.recipes.size }} [kid-tested recipes](/recipes/)—or maybe another that's being invented right this moment!

[^2]: Running distance YTD = {{ site.data.strava.ytd_run_distance | round: 0 }} km; riding distance YTD = {{ site.data.strava.ytd_ride_distance | round: 0 }} km via [Strava API](https://developers.strava.com/docs/reference/).

<span class="muted small">Last updated: {{ page.last_modified_at }}—except ${time in SF}, ${time since last blog post}, ${current book title}, and Swarm and Strava data (via respective APIs).</span>