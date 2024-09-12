---
layout: prayer
title: Today's Rosary
category: Marian
---
{% assign day_number = site.time | date: "%w" | plus: 0 %}
{% assign mysteries = site.data.rosary_mysteries %}
{% assign today_mystery = mysteries[day_number] %}

## Today's Rosary Mysteries

Today is {{ site.time | date: "%A" }}, so we pray the {{ today_mystery.set }} Mysteries:

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