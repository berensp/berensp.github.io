---
layout: page
title: Cycling
permalink: /cycling/
description: I want to ride my bicycle; I want to ride my bike.
---
<img src="/assets/og/marin.ride.bw.png" width="50%" height="50%">

My preferred means of soaking in the great outdoors whilst spiking serotonin and dopamine. (Alas, I don't allocate the time for it these days and so I end up [running](/running/).)

Some favorite rides 👇

{% assign categories = "Shorter Rides,Medium Rides,Long Rides/Centuries" | split: "," %}

{% for category in categories %}
  {% assign routes_in_category = site.ride | where: "category", category %}
  {% if routes_in_category.size > 0 %}
<h2>{{ category }}</h2>
<ul class="more-space">
    {% for route in routes_in_category %}
  <li><a class="route-link" href="{{ route.url | relative_url }}">{{ route.title | escape }}</a></li>
    {% endfor %}
</ul>
  {% endif %}
{% endfor %}


<span class="muted small">* </span><a class="muted small" href="/centuries/">Century ride</a><span class="muted small"> (~100 miles).</span>