---
layout: page
title: Today
permalink: /today/
---
{% assign currentDate = site.time | date: '%Y-%m-%d %H:%M:%S %z' %}
{% assign pacificOffset = -7 %}
{% assign pacificTime = currentDate | date: '%s' | plus: pacificOffset | times: 3600 | date: '%Y-%m-%d %H:%M:%S' %}
{% assign current_day = pacificTime | date: "%A" | downcase %}
{% assign current_day_number = pacificTime | date: "%w" | plus: 0 %}
{% assign date_for_lookup = pacificTime | date: "%m-%d" %}
{% assign currently_reading = site.books | where: "category", "Presently Reading" | first %}

<h2 id="current-date">{{ pacificTime | date: "%A, %B %d, %Y" }}</h2>

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
  const currentlyReading = {{ currently_reading | jsonify }};

  const quotidie = document.getElementById('quotidie');
  const tasks = quotidie.getElementsByTagName('li');

  Array.from(tasks).forEach(task => {
    if (task.textContent.includes('Rosary')) {
      task.innerHTML = task.innerHTML.replace(
        'Rosary',
        `<a href="/prayers/rosary/">${todayMystery.set} Mysteries</a>`
      );
    } else if (task.textContent.includes('Read')) {
      if (currentlyReading && currentlyReading.title) {
        task.innerHTML = task.innerHTML.replace(
          /Read .+/,
          `Read <a href="${currentlyReading.url}">${currentlyReading.title}</a>`
        );
      }
    }
  });

  // Ensure all dates are displayed in Pacific Time
  const options = { timeZone: 'America/Los_Angeles', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const pacificDate = new Date().toLocaleString('en-US', options);
  document.getElementById('current-date').textContent = pacificDate;
});
</script>
