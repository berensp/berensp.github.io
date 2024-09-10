---
layout: page
title: Prayers
permalink: /prayers/
description: We got to pray just to make it today.
---
<p><img src="/assets/images/angel-song-of-bethlehem.png" alt="Angel from the Song of Bethlehem" style="width: 50%;">

{% assign categories = "Ante Missam,Inter Missam,Post Missam,Marian,Saints,Miscellany" | split: "," %}

{% for category in categories %}
  {% assign routes_in_category = site.prayers | where: "category", category %}
  {% if routes_in_category.size > 0 %}
<h2>{{ category }}</h2>
<ul class="more-space">
    {% for route in routes_in_category %}
  <li><a class="route-link" href="{{ route.url | relative_url }}">{{ route.title | escape }}</a></li>
    {% endfor %}
</ul>
  {% endif %}
{% endfor %}