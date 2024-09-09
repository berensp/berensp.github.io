---
layout: page
title: Running
permalink: /running/
description: correr
---
<img src="/assets/og/tahoe.half.bw.png" width="50%" height="50%">

When I don't have time for a [ride](/cycling/)—which is nearly always the case nowadays—there aren't many aerobic options as easy and endorphin-boosting as running. Given the choice I opt for the trail; not just to be good to these patellofemoral arthralgia-disposed knees, but also to be able to take in some beautiful scenery whilst [catching up on podcasts](/assets/audio/pmb_podcasts_opml_20240318.xml) or [just thinking](/solvitur-currendo.html).

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
