---
layout: page
title: Today
permalink: /today/
---
{% assign currently_reading = site.books | where: "category", "Presently Reading" | first %}
<h2 id="current-date">Loading...</h2>
<ul>
<li>📆 <strong>Event:</strong> <span id="daily-event">Loading...</span></li>
<li>🕯️ <strong>Feast:</strong> <span id="feast-day">Loading...</span></li>
<li>📝 <strong>Quote:</strong> [forthcoming]</li>
<li>📻 <strong>Song:</strong> [forthcoming]</li>
</ul>
<h2>Quotidie</h2>
<ul id="quotidie-list">
  <li>Loading...</li>
</ul>

<script>
var dailyEvents = {{ site.data.daily_events | jsonify }};
var feastDays = {{ site.data.feast_days | jsonify }};
var quotidie = {{ site.data.quotidie | jsonify }};
var currentlyReading = {{ currently_reading | jsonify }};

document.addEventListener('DOMContentLoaded', function() {
  function getPacificTime() {
    const options = { 
      timeZone: 'America/Los_Angeles', 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    };
    return new Date().toLocaleString('en-US', options);
  }

  function updateDateDependentContent() {
    const pacificTime = getPacificTime();
    console.log('Current Pacific Time:', pacificTime);
    
    const [weekday, fullDate] = pacificTime.split(', ');
    document.getElementById('current-date').textContent = pacificTime;

    const [month, day, year] = fullDate.split(' ');
    const currentDate = `${month.substring(0,3)}-${day.padStart(2, '0')}`;
    
    updateDailyEvent(currentDate);
    updateFeastDay(currentDate);
    updateQuotidieList(weekday.toLowerCase());
  }

  function updateDailyEvent(date) {
    const event = dailyEvents.find(e => e.date === date);
    document.getElementById('daily-event').textContent = event ? event.event : "No specific event today";
  }

  function updateFeastDay(date) {
    const feast = feastDays.find(f => f.date === date);
    document.getElementById('feast-day').textContent = feast ? feast.feast : "No feast day today";
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
  updateDateDependentContent();
  setInterval(updateDateDependentContent, 60000);
});
</script>
