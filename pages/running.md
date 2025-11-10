---
layout: page
title: Running
permalink: /running/
description: correr
ogimage: tahoe.half.bw.png
---
<img src="/assets/og/tahoe.half.bw.png" width="50%" height="50%">

Hey, I might rather be [cycling](/cycling/), but when time is dear there aren't many aerobic options as easy and endorphin-boosting as running. Given the choice I opt for the trail; not just to be good to these patellofemoral arthralgia-disposed knees, but also to be able to take in some beautiful scenery whilst [catching up on podcasts](/assets/audio/pmb_podcasts_opml_20240318.xml) or [just thinking](/solvitur-currendo.html).

Year to date distance: **{{ site.data.strava.ytd_run_distance | round: 0 }} km**[^1]

[^1]: via [Strava API](https://developers.strava.com/docs/reference/).

Some favorite routes 👇

{% assign categories = "San Francisco,Greater Bay Area,Away from home" | split: "," %}

{% for category in categories %}
  {% assign routes_in_category = site.runs | where: "category", category %}
  {% if routes_in_category.size > 0 %}
<h2>{{ category }}</h2>
<ul class="more-space">
    {% for route in routes_in_category %}
  <li><a class="route-link" href="{{ route.url | relative_url }}">{{ route.title | escape }}</a></li>
    {% endfor %}
</ul>
  {% endif %}
{% endfor %}
