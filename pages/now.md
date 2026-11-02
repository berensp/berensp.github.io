---
layout: page
title: Now
permalink: /now/
description: What I'm up to these days.
---
<div id="postDate" data-post-date="{{ site.posts.first.date | date: '%Y-%m-%dT%H:%M:%SZ' }}"></div>
{% assign currently_reading = site.data.books | where: "category", "Presently Reading" | first %}
{% assign last_read = site.data.books | where: "category", "Last Read" | first %}

{% if site.data.strava.last_run_or_ride.date %}
  {% assign strava_timestamp = site.data.strava.last_run_or_ride.date | date: "%s" | minus: 28800 %}
  {% assign strava_date = strava_timestamp | date: "%Y-%m-%d" %}
{% else %}
  {% assign strava_timestamp = 0 %}
{% endif %}

{% if site.data.swarm.timestamp %}
  {% assign swarm_pst = site.data.swarm.timestamp | minus: 28800 %}
  {% assign swarm_date = swarm_pst | date: "%Y-%m-%d" %}
{% else %}
  {% assign swarm_pst = 0 %}
{% endif %}

{% if strava_timestamp > swarm_pst %}
  {% assign last_update = strava_date %}
  {% assign update_source = "Strava API" %}
{% else %}
  {% assign last_update = swarm_date %}
  {% assign update_source = "Foursquare API" %}
{% endif %}

<script src="/assets/js/timediff.js"></script>
<script src="/assets/js/current-date.js"></script>

"Now" being what I'm up to *nowadays*[^1]; for *right now* (i.e., <span id="current-date">Loading...</span>), skip over to [today](/today/).

[^1]: H/t to <a href="https://sive.rs/" target="_blank">Derek Sivers</a> for this <a href="https://nownownow.com/about" target="_blank">now page concept</a>.

- [Living](/domiciles/) in [San Francisco](/sf/) for some <span id="TimeinSF"></span> now with my beautiful family{% if site.data.swarm %}—most recently spotted at [{{ site.data.swarm.venue }}]({{ site.data.swarm.url }}) via [Swarm](https://docs.foursquare.com/developer/reference/personalization-api-overview).{% endif %}
- [Growing](/about/) a SaaS biz / digital products portfolio (product marketing / GTM) [@{{ site.gig_handle }}](https://x.com/{{ site.gig_handle }})
{%- assign active = site.data.projects | where: "status", "active" %}
- [Building](/projects/) {{ active[0].name }}, {{ active[1].name }}, etc.
- [Writing](/posts/) across a smörgåsbord of topics—most recently [*{{ site.posts.first.title }}*]({{ site.posts.first.url }}), posted <span id="timeDifferenceInline"></span>
- [Reading](/books/) *{{ currently_reading.title }}* by {{ currently_reading.author }}—previously *{{ last_read.title }}* by {{ last_read.author }}
{%- assign rr = site.data.strava.last_run_or_ride %}
{%- if rr.kind == "ride" %}
- [Bicycling](/cycling/) infrequently but just did a [{{ rr.distance }}km, {{ rr.elevation }}m gain ride]({{ rr.url }}) via [Strava](https://developers.strava.com/docs/reference/)
{%- elsif rr.kind == "run" %}
- [Jogging](/running/) hither, thither, and yon, with most recent being a [{{ rr.distance }}km, {{ rr.elevation }}m gain run]({{ rr.url }}) via [Strava](https://developers.strava.com/docs/reference/)
{%- endif %}

<span class="muted small">Last updated: {{ last_update }} via {{ update_source }}.</span>