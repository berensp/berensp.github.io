---
layout: page
title: Now
permalink: /now/
last_modified_at: 2025-10-11
description: What I'm up to these days.
---
<div id="postDate" data-post-date="{{ site.posts.first.date | date: '%Y-%m-%dT%H:%M:%SZ' }}"></div>
{% assign currently_reading = site.books | where: "category", "Presently Reading" | first %}

<script src="/assets/js/timediff.js"></script>
<script src="/assets/js/current-date.js"></script>

"Now" being what I'm up to *nowadays*[^1]; for *right now* (i.e., <span id="current-date">Loading...</span>), skip ahead to [today](/today/).

[^1]: H/t to <a href="https://sive.rs/" target="_blank">Derek Sivers</a> for this <a href="https://nownownow.com/about" target="_blank">now page concept</a>.

- **[Living](/domiciles/)** in [San Francisco](/sf/) for some <span id="TimeinSF"></span> now with my beautiful family{% if site.data.swarm %}—last seen at [{{ site.data.swarm.venue }}]({{ site.data.swarm.url }}) via [Swarm](https://swarmapp.com/).{% endif %}
- **[Growing](/bio/)** a SaaS biz / digital products portfolio (product marketing / GTM) [@VarianMedSys](https://x.com/VarianMedSys)
- **[Writing](/posts/)** across a smörgåsbord of topics—most recently [*{{ site.posts.first.title }}*]({{ site.posts.first.url }}), posted <span id="timeDifferenceInline"></span>
- **[Reading](/books/)** [*{{ currently_reading.title }}*]({{ currently_reading.url | relative_url }}) by {{ currently_reading.author }}
- **[Learning](/learning/)** Exodus 90 disciplines; a little bit of front-end (via Claude); kanban
- **[Riding](/cycling/)** and **[running](/running/)**—barely enough to stay in shape.{% if site.data.strava %} Last [{{ site.data.strava.type | downcase }}]({{ site.data.strava.url }}) on {{ site.data.strava.date | date: "%b %-d" }}: {{ site.data.strava.distance }} mi, {{ site.data.strava.elevation }}' gain via [Strava](https://www.strava.com/athletes/292688).{% endif %}

<span class="muted small">Last updated: {{ page.last_modified_at }}—except ${time in SF} and ${time since last blog post} which are real-time calcs; and ${current book title} which is pulling from a </span><a class="muted small" href="https://jekyllrb.com/docs/collections/" target="_blank">collection.</a>