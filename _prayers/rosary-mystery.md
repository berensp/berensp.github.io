---
layout: prayer
title: Today's Rosary
category: Marian
---

{% assign day_number = site.time | date: "%w" | plus: 0 %}
{% assign tomorrow_number = day_number | plus: 1 | modulo: 7 %}
{% assign mysteries = site.data.rosary_mysteries %}
{% assign today_mystery = mysteries[day_number] %}
{% assign tomorrow_mystery = mysteries[tomorrow_number] %}

Today we'll do the <b>{{ today_mystery.set }} Mysteries<b> since it's {{ site.time | date: "%A" }}.

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