---
layout: page
title: Today
permalink: /today/
---

{% assign current_date = site.time | date: '%Y-%m-%d' %}
{% assign pacific_time = site.time | date: '%Y-%m-%d %H:%M:%S %Z' | date: '%Y-%m-%d %H:%M:%S America/Los_Angeles' | date: '%Y-%m-%d' %}
{% assign current_day = pacific_time | date: "%A" | downcase %}
{% assign current_day_number = pacific_time | date: "%w" | plus: 0 %}
{% assign date_for_lookup = pacific_time | date: "%m-%d" %}

<h1>Today</h1>
<h2 id="current-date">{{ pacific_time | date: "%A, %B %d, %Y" }}</h2>

<ul>
<li>📆 <strong>Event:</strong> 
  {% assign event = site.data.daily_events | where: "date", date_for_lookup | first %}
  <span id="daily-event">{{ event.event | default: "No event today" }}</span>
</li>
<li>🕯️ <strong>Feast:</strong> 
  {% assign feast = site.data.feast_days | where: "date", date_for_lookup | first %}
  <span id="feast-day">{{ feast.feast | default: "No feast day today" }}</span>
</li>
<li>📝 <strong>Quote:</strong> [forthcoming]</li>
<li>📻 <strong>Song:</strong> [forthcoming]</li>
</ul>

<h2>Quotidie</h2>
<ul id="quotidie">
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
  const rosaryMysteries = {{ site.data.rosary_mysteries | jsonify }};
  const todayMystery = rosaryMysteries[{{ current_day_number }}];
  const rosaryTasks = document.querySelectorAll('#quotidie li:contains("Rosary")');
  
  rosaryTasks.forEach(task => {
    task.innerHTML += ` (${todayMystery.set} Mysteries)`;
  });

  // Ensure all dates are displayed in Pacific Time
  const options = { timeZone: 'America/Los_Angeles', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const pacificDate = new Date().toLocaleString('en-US', options);
  document.getElementById('current-date').textContent = pacificDate;

  // You might want to update the daily event and feast day here as well if they need to be in Pacific Time
  // This depends on how your YAML data is structured and if it needs to account for timezone differences
});
</script>