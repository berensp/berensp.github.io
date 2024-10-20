---
layout: page
title: Today
permalink: /today/
---
<h2 id="current-date">Loading...</h2>
<ul>
  <li>📆 <strong>Event:</strong> <span id="daily-event">Loading...</span></li>
  <li>🕯️ <strong>Feast:</strong> <span id="feast-day">Loading...</span></li>
  <li>🎈 <strong>Birthday:</strong> <span id="b-day">Loading...</span></li>
  <li>📝 <strong>Quote:</strong> [forthcoming]</li>
  <li>📻 <strong>Song:</strong> [forthcoming]</li>
  <li>📖 <strong>Daily Readings:</strong> <a id="daily-readings" href="#" target="_blank">Loading...</a></li>
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
    
    const birthday = siteData.bdays.find(b => b.date === currentDate);
    document.getElementById('b-day').innerHTML = birthday ? birthday.bday : "Today is an unbirthday";
    
    const quotidieList = document.getElementById('quotidie-list');
    quotidieList.innerHTML = '';
    siteData.quotidie[currentDay].forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = task.task;
      quotidieList.appendChild(li);
    });

    // Update USCCB Daily Readings link
    const usccbDate = pacificTime.toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }).replace(/\//g, '');
    const usccbLink = `https://bible.usccb.org/bible/readings/${usccbDate}.cfm`;
    const dailyReadingsLink = document.getElementById('daily-readings');
    dailyReadingsLink.href = usccbLink;
    dailyReadingsLink.textContent = 'USCCB Daily Readings';

    console.log('Current Pacific Time:', pacificTime.toLocaleString());
    console.log('Lookup date for events, feasts, bdays:', currentDate);
    console.log('Current day for Quotidie:', currentDay);
    console.log('USCCB Date:', usccbDate);
  }
  updateTimeElements();
  setInterval(updateTimeElements, 60000);
});
</script>