---
layout: prayer
title: Today's Rosary
category: Marian
---

{% assign utc_offset = -7 %}
{% assign seconds_in_day = 86400 %}
{% assign local_seconds = site.time | date: "%s" | plus: utc_offset | times: 3600 %}
{% assign local_seconds_normalized = local_seconds | modulo: seconds_in_day %}
{% if local_seconds < 0 %}
  {% assign local_seconds_normalized = local_seconds_normalized | plus: seconds_in_day %}
{% endif %}
{% assign local_time = local_seconds_normalized | date: "%w" | plus: 0 %}

{% comment %}
<!-- Debug logging -->
{% capture log_message %}
UTC time: {{ site.time | date: "%Y-%m-%d %H:%M:%S %Z" }}
Local time (PDT): {{ local_seconds_normalized | date: "%Y-%m-%d %H:%M:%S %Z" }}
Day of week: {{ local_time }}
{% endcapture %}
{{ log_message | inspect }}
{% endcomment %}

{% assign tomorrow_number = local_time | plus: 1 | modulo: 7 %}
{% assign mysteries = site.data.rosary_mysteries %}
{% assign today_mystery = mysteries[local_time] %}
{% assign tomorrow_mystery = mysteries[tomorrow_number] %}

It's the <b>{{ today_mystery.set }} Mysteries</b> today since it's {{ local_seconds_normalized | date: "%A" }} (in San Francisco).

## Opening

<ul style="list-style:none">
  <li><input type="checkbox"/><a href="/prayers/signum-crucis/">Signum Crucis</a></li>
  <li><input type="checkbox"/><a href="/prayers/apostles-creed/">Apostles' Creed</a></li>
  <li><input type="checkbox"/><a href="/prayers/pater-noster/">Our Father</a></li>
  <li><input type="checkbox"/><a href="/prayers/ave-maria/">Hail Mary</a></li>
  <li><input type="checkbox"/><a href="/prayers/ave-maria/">Hail Mary</a></li>
  <li><input type="checkbox"/><a href="/prayers/ave-maria/">Hail Mary</a></li>
  <li><input type="checkbox"/><a href="/prayers/gloria-patri/">Gloria Patri</a></li>
</ul>

{% for mystery in today_mystery.mysteries %}
## {{ mystery }}

<ul style="list-style-type: none;">
  {% for i in (1..10) %}
    <li>
      <input type="checkbox" id="hailmary-{{ forloop.parentloop.index }}-{{ forloop.index }}"/>
      <label for="hailmary-{{ forloop.parentloop.index }}-{{ forloop.index }}">
        <a href="/prayers/ave-maria/">Hail Mary</a>
      </label>
    </li>
  {% endfor %}
</ul>
{% endfor %}

## Closing

<ul style="list-style:none">
  <li><input type="checkbox"/><a href="/prayers/salve-regina/">Hail, Holy Queen</a></li>
  <li><input type="checkbox"/><a href="/prayers/rosary-end/">Oratio ad Finem Rosarii Dicenda</a></li>
</ul>

<span class="muted small">Tomorrow we will pray the {{ tomorrow_mystery.set }} Mysteries: {{ tomorrow_mystery.mysteries | join: ", " }}</span>