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
document.addEventListener('DOMContentLoaded', function() {
  console.log('site.time:', '{{ site.time | date: "%Y-%m-%d %H:%M:%S %Z" }}');

  function adjustTime(timeString, hoursToSubtract) {
    const date = new Date(timeString);
    date.setHours(date.getHours() - hoursToSubtract);
    return date;
  }

  const correctedTime = adjustTime('{{ site.time | date: "%Y-%m-%d %H:%M:%S %Z" }}', 7);
  console.log('Corrected time:', correctedTime.toISOString());

  function formatDate(date) {
    const options = { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      timeZone: 'America/Los_Angeles'
    };
    return date.toLocaleString('en-US', options);
  }

  function formatDateForLookup(date) {
    const options = { 
      month: 'short',
      day: '2-digit',
      timeZone: 'America/Los_Angeles'
    };
    return date.toLocaleString('en-US', options).replace(',', '-');
  }

  const formattedDate = formatDate(correctedTime);
  const lookupDate = formatDateForLookup(correctedTime);
  const currentDay = correctedTime.toLocaleString('en-US', { weekday: 'long', timeZone: 'America/Los_Angeles' }).toLowerCase();

  document.getElementById('current-date').textContent = formattedDate;

  // Update daily event
  const dailyEvents = {{ site.data.daily_events | jsonify }};
  const event = dailyEvents.find(e => e.date === lookupDate);
  document.getElementById('daily-event').textContent = event ? event.event : "No specific event today";

  // Update feast day
  const feastDays = {{ site.data.feast_days | jsonify }};
  const feast = feastDays.find(f => f.date === lookupDate);
  document.getElementById('feast-day').textContent = feast ? feast.feast : "No feast day today";

  // Update Quotidie list
  const quotidie = {{ site.data.quotidie | jsonify }};
  const tasks = quotidie[currentDay];
  const quotidieList = document.getElementById('quotidie-list');
  quotidieList.innerHTML = ''; // Clear loading message

  const currentlyReading = {{ currently_reading | jsonify }};

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

  console.log('Current day for Quotidie:', currentDay);
  console.log('Lookup date for events and feasts:', lookupDate);
});
</script>
