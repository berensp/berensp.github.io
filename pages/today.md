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
  <li>Loading...</li>
</ul>

<script>
var quotidie = {{ site.data.quotidie | jsonify }};
var currentlyReading = {{ currently_reading | jsonify }};

document.addEventListener('DOMContentLoaded', function() {
  function getPacificTime() {
    const options = { 
      timeZone: 'America/Los_Angeles', 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date().toLocaleString('en-US', options);
  }

  function updateDateAndQuotidie() {
    const pacificTime = getPacificTime();
    console.log('Current Pacific Time:', pacificTime);
    document.getElementById('current-date').textContent = pacificTime;

    const currentDay = pacificTime.split(',')[0].toLowerCase();
    updateQuotidieList(currentDay);
  }

  function updateQuotidieList(day) {
    const tasks = quotidie[day];
    const quotidieList = document.getElementById('quotidie-list');
    quotidieList.innerHTML = ''; // Clear existing tasks

    tasks.forEach(task => {
      const li = document.createElement('li');
      if (task.task.includes("Read") && currentlyReading) {
        li.innerHTML = `📚 Read <i><a href="${currentlyReading.url}">${currentlyReading.title}</a></i> (0:30)`;
      } else if (task.task.includes("[INPUT]")) {
        li.innerHTML = task.task.replace("[INPUT]", '<input type="text" name="task">');
      } else {
        li.textContent = task.task;
      }
      quotidieList.appendChild(li);
    });
  }

  // Run initially and then every minute
  updateDateAndQuotidie();
  setInterval(updateDateAndQuotidie, 60000);
});
</script>
