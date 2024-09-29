---
layout: page
title: Today
permalink: /today/
---
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
// Site data will be populated by Jekyll
var siteData = {
  dailyEvents: {{ site.data.daily_events | jsonify }},
  feastDays: {{ site.data.feast_days | jsonify }},
  quotidie: {{ site.data.quotidie | jsonify }},
  currentlyReading: {% if site.books %}{{ site.books | where: "category", "Presently Reading" | first | jsonify }}{% else %}null{% endif %}
};

document.addEventListener('DOMContentLoaded', function() {
  function getPacificTime() {
    return new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
  }

  function updateTimeElements() {
    const pacificTime = new Date(getPacificTime());
    
    document.getElementById('current-date').textContent = pacificTime.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    const currentDate = pacificTime.toLocaleString('en-US', { month: '2-digit', day: '2-digit' }).replace('/', '-');
    const currentDay = pacificTime.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
    
    const event = siteData.dailyEvents.find(e => e.date === currentDate);
    document.getElementById('daily-event').textContent = event ? event.event : "No specific event today";
    
    const feast = siteData.feastDays.find(f => f.date === currentDate);
    document.getElementById('feast-day').textContent = feast ? feast.feast : "No feast day today";
    
    const quotidieList = document.getElementById('quotidie-list');
    quotidieList.innerHTML = '';
    siteData.quotidie[currentDay].forEach(task => {
      const li = document.createElement('li');
      if (task.task.includes("Read") && siteData.currentlyReading) {
        li.innerHTML = `📚 Read <i><a href="${siteData.currentlyReading.url}">${siteData.currentlyReading.title}</a></i> (0:30)`;
      } else if (task.task.includes("[INPUT]")) {
        li.innerHTML = task.task.replace("[INPUT]", '<input type="text" name="task">');
      } else {
        li.textContent = task.task;
      }
      quotidieList.appendChild(li);
    });

    console.log('Current Pacific Time:', pacificTime.toLocaleString());
    console.log('Lookup date for events and feasts:', currentDate);
    console.log('Current day for Quotidie:', currentDay);
  }

  updateTimeElements();
  setInterval(updateTimeElements, 60000);
});
</script>
