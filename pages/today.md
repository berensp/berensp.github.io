---
layout: page
title: Today
permalink: /today/
---

{% assign currently_reading = site.books | where: "category", "Presently Reading" | first %}

<h2 id="current-date">Loading...</h2>

<ul>
<li>📆 <strong>Event:</strong> 
  {% assign current_date = site.time | date: "%m-%d" %}
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
  {% assign current_day = site.time | date: "%A" | downcase %}
  {% for task in site.data.quotidie[current_day] %}
    <li>
      {% if task.task contains "Read" %}
        {% if currently_reading %}
          Read <a href="{{ currently_reading.url }}">{{ currently_reading.title }}</a>
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
document.addEventListener('DOMContentLoaded', function() {
  function getPacificTime() {
    const options = { 
      timeZone: 'America/Los_Angeles', 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    };
    return new Date().toLocaleString('en-US', options);
  }

  const pacificTime = getPacificTime();
  console.log('Current Pacific Time:', pacificTime);
  
  document.getElementById('current-date').textContent = pacificTime.split(', ')[1];
});
</script>
