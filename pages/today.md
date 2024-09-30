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
document.addEventListener('DOMContentLoaded', function() {
  const siteData = {{ site.data | jsonify }};
  
  function getPacificTime() {
    return new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
  }

  function updateTimeElements() {
    const pacificTime = new Date(getPacificTime());
    
    document.getElementById('current-date').textContent = pacificTime.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    const currentDate = pacificTime.toLocaleString('en-US', { month: '2-digit', day: '2-digit' }).replace('/', '-');
    const currentDay = pacificTime.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
    
    const event = siteData.daily_events.find(e => e.date === currentDate);
    document.getElementById('daily-event').innerHTML = event ? event.event : "No specific event today";
    
    const feast = siteData.feast_days.find(f => f.date === currentDate);
    document.getElementById('feast-day').innerHTML = feast ? feast.feast : "No feast day today";
    
    const quotidieList = document.getElementById('quotidie-list');
    quotidieList.innerHTML = '';
    siteData.quotidie[currentDay].forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = task.task;
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