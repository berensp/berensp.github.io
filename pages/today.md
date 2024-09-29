---
layout: page
title: Today
permalink: /today/
---
{% assign pacific_time = site.time | date: '%s' | minus: 25200 | date: '%Y-%m-%d %H:%M:%S' %}
{% assign currently_reading = site.books | where: "category", "Presently Reading" | first %}
<h2 id="current-date">{{ pacific_time | date: "%A, %B %d, %Y" }}</h2>
<ul>
<li>📆 <strong>Event:</strong> 
  {% assign current_date = pacific_time | date: "%m-%d" %}
  {% assign event = site.data.daily_events | where: "date", current_date | first %}
  <span id="daily-event">{{ event.event | default: "No specific event today" }}</span>
</li>
<li>🕯️ <strong>Feast:</strong> 
  {% assign feast = site.data.feast_days | where: "date", current_date | first %}
  <span id="feast-day">{{ feast.feast | default: "No feast day today" }}</span>
</li>
<li>📝 <strong>Quote:</strong> [forthcoming]</li>
<li>📻 <strong>Song:</strong> [forthcoming]</li>
</ul>
<h2>Quotidie</h2>
<ul id="quotidie-list">
  {% assign current_day = pacific_time | date: "%A" | downcase %}
  {% for task in site.data.quotidie[current_day] %}
    <li>
      {% if task.task contains "Read" %}
        {% if currently_reading %}
          📚 Read <i><a href="{{ currently_reading.url }}">{{ currently_reading.title }}</a></i> (0:30)
        {% else %}
          {{ task.task }}
        {% endif %}
      {% elsif task.task contains "[INPUT]" %}
        {{ task.task | replace: "[INPUT]", '<input type="text" name="task">' }}
      {% else %}
        {{ task.task }}
      {% endif %}
    </li>
  {% endfor %}
</ul>
<script>
console.log('Site time (UTC):', '{{ site.time | date: "%Y-%m-%d %H:%M:%S %Z" }}');
console.log('Adjusted Pacific time:', '{{ pacific_time | date: "%Y-%m-%d %H:%M:%S" }}');
console.log('Lookup date for events and feasts:', '{{ current_date }}');
console.log('Found event:', '{{ event.event | jsonify }}');
console.log('Found feast:', '{{ feast.feast | jsonify }}');
</script>
