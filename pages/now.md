---
layout: page
title: Now
permalink: /now/
description: What I'm up to these days.
---
<div id="postDate" data-post-date="{{ site.posts.first.date | date: '%Y-%m-%dT%H:%M:%SZ' }}"></div>
{% assign currently_reading = site.data.books | where: "category", "Presently Reading" | first %}

{% if site.data.strava.date %}
  {% assign strava_timestamp = site.data.strava.date | date: "%s" | plus: 0 %}
{% else %}
  {% assign strava_timestamp = 0 %}
{% endif %}

{% if site.data.swarm.timestamp %}
  {% assign swarm_timestamp = site.data.swarm.timestamp | plus: 0 %}
{% else %}
  {% assign swarm_timestamp = 0 %}
{% endif %}

{% if strava_timestamp > swarm_timestamp %}
  {% assign last_update = site.data.strava.date | date: "%Y-%m-%d" %}
  {% assign update_source = "[Strava API](https://developers.strava.com/docs/reference/)" %}
{% else %}
  {% assign last_update = site.data.swarm.timestamp | date: "%Y-%m-%d" %}
  {% assign update_source = "[Foursquare API](https://docs.foursquare.com/developer/reference/personalization-api-overview)" %}

{% endif %}

<script src="/assets/js/timediff.js"></script>
<script src="/assets/js/current-date.js"></script>

"Now" being what I'm up to *nowadays*[^1]; for *right now* (i.e., <span id="current-date">Loading...</span>), skip ahead to [today](/today/).

[^1]: H/t to <a href="https://sive.rs/" target="_blank">Derek Sivers</a> for this <a href="https://nownownow.com/about" target="_blank">now page concept</a>.

- [Living](/domiciles/) in [San Francisco](/sf/) for some <span id="TimeinSF"></span> now with my beautiful family{% if site.data.swarm %}—most recently spotted at [{{ site.data.swarm.venue }}]({{ site.data.swarm.url }}) via [Swarm](https://swarmapp.com/).{% endif %}
- [Growing](/bio/) a SaaS biz / digital products portfolio (product marketing / GTM) [@VarianMedSys](https://x.com/VarianMedSys)
- [Writing](/posts/) across a smörgåsbord of topics—most recently [*{{ site.posts.first.title }}*]({{ site.posts.first.url }}), posted <span id="timeDifferenceInline"></span>
- [Reading](/books/) *{{ currently_reading.title }}* by {{ currently_reading.author }}
- [Learning](/learning/) {{ site.data.learning.current.first.endeavour | strip_html }}{% if site.data.learning.current[1] %}, {{ site.data.learning.current[1].endeavour | strip_html }}{% endif %}, etc.
- [Riding](/cycling/) and [running](/running/)—barely enough to stay in shape{% if site.data.strava %}—with last recorded [{{ site.data.strava.type | downcase }}]({{ site.data.strava.url }}) on {{ site.data.strava.date | date: "%b %-d" }}: {{ site.data.strava.distance }}km, {{ site.data.strava.elevation }}m gain via [Strava](https://www.strava.com/athletes/berenzino/){% endif %}
- [Cooking](/recipes/) up something that the kids can push around their plates and pick at

<span class="muted small">Last updated: {{ last_update }} via {{ update_source }}.</span>