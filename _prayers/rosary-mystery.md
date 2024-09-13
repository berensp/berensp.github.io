---
layout: prayer
title: Today's Rosary: {{ today_mystery.set }}
category: Marian
---
{% assign day_number = site.time | date: "%w" | plus: 0 %}
{% assign mysteries = site.data.rosary_mysteries %}
{% assign today_mystery = mysteries[day_number] %}

...since today is {{ site.time | date: "%A" }}.

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
  <li><input type="checkbox"/><a href="/prayers/salve-regina/">Hail, Holy Queen</a></li>
  <li><input type="checkbox"/><a href="/prayers/rosary-end/">Oratio ad Finem Rosarii Dicenda</a></li>
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