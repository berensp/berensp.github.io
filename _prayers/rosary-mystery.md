---
layout: prayer
title: Today's Rosary
category: Marian
---
{% assign day_number = site.time | date: "%w" | plus: 0 %}
{% assign mysteries = site.data.rosary_mysteries %}
{% assign today_mystery = mysteries[day_number] %}

Today is {{ site.time | date: "%A" }}, so we pray the {{ today_mystery.set }} Mysteries.

## Opening

<ul style="list-style:none">
  <li><input type="checkbox"/>[Signum Crucis](/prayers/signum-crucis/)</li>
  <li><input type="checkbox"/>[Apostles' Creed](/prayers/apostles-creed/)</li>
  <li><input type="checkbox"/>[Our Father](/prayers/pater-noster/)</li>
  <li><input type="checkbox"/>[Hail Mary](/prayers/ave-maria/)</li>
  <li><input type="checkbox"/>[Hail Mary](/prayers/ave-maria/)</li>
  <li><input type="checkbox"/>[Hail Mary](/prayers/ave-maria/)</li>
  <li><input type="checkbox"/>[Gloria Patri](/prayers/gloria-patri/)</li>
</ul>

## {{ today_mystery.set }} Mysteries

<ol>
{% for mystery in today_mystery.mysteries %}
  <li>
    <strong>{{ mystery }}</strong>
    <ul style="list-style-type: none;">
      {% for i in (1..10) %}
        <li><input type="checkbox" id="hailmary-{{ forloop.parentloop.index }}-{{ forloop.index }}"/>
          <label for="hailmary-{{ forloop.parentloop.index }}-{{ forloop.index }}">
            <a href="/prayers/ave-maria/">Hail Mary</a>
          </label>
        </li>
      {% endfor %}
    </ul>
  </li>
{% endfor %}
</ol>

## Closing

<ul style="list-style:none">
  <li><input type="checkbox"/>[Hail, Holy Queen](/prayers/salve-regina/)</li>
  <li><input type="checkbox"/>[Oratio ad Finem Rosarii Dicenda](/prayers/rosary-end/)</li>
</ul>

### All Mystery Sets:

<ul>
{% for mystery_set in mysteries %}
  <li>
    <strong>{{ mystery_set.day }}:</strong> {{ mystery_set.set }} Mysteries
    <ol>
    {% for mystery in mystery_set.mysteries %}
      <li>
        {{ mystery }}
        <ul style="list-style-type: none;">
          {% for i in (1..10) %}
            <li><input type="checkbox" id="hailmary-all-{{ forloop.parentloop.parentloop.index }}-{{ forloop.parentloop.index }}-{{ forloop.index }}"/>
              <label for="hailmary-all-{{ forloop.parentloop.parentloop.index }}-{{ forloop.parentloop.index }}-{{ forloop.index }}">
                <a href="/prayers/ave-maria/">Hail Mary</a>
              </label>
            </li>
          {% endfor %}
        </ul>
      </li>
    {% endfor %}
    </ol>
  </li>
{% endfor %}
</ul>