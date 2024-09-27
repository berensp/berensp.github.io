---
layout: page
title: Today
permalink: /today/
---

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
      {% if task.task contains "[INPUT]" %}
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
    const options = { timeZone: 'America/Los_Angeles', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleString('en-US', options);
  }

  document.getElementById('current-date').textContent = getPacificTime();
});
</script>
