---
layout: page
title: Today
permalink: /today/
---
<h2 id="current-date">Loading...</h2>
<ul>
  <span id="event-container"></span>
  <li>🕯️ <span id="feast-day">Loading...</span></li>
  <li>📖 <a id="daily-readings" href="#" target="_blank">Loading...</a></li>
  <span id="birthday-container"></span>
  <span id="song-container"></span>
  <li>📝 [forthcoming]</li>

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
    
    // Handle daily event
    const event = siteData.daily_events.find(e => e.date === currentDate);
    const eventContainer = document.getElementById('event-container');
    if (event) {
      eventContainer.innerHTML = `<li>📆 <span id="daily-event">${event.event}</span></li>`;
    } else {
      eventContainer.innerHTML = '';
    }
    
    const feast = siteData.feast_days.find(f => f.date === currentDate);
    document.getElementById('feast-day').innerHTML = feast ? feast.feast : "No feast day today";
    
    // Handle birthday
    const birthday = siteData.bdays.find(b => b.date === currentDate);
    const birthdayContainer = document.getElementById('birthday-container');
    if (birthday) {
      birthdayContainer.innerHTML = `<li>🎈 <span id="b-day">${birthday.bday}</span></li>`;
    } else {
      birthdayContainer.innerHTML = '';
    }


    // Handle daily song
    const dailysong = siteData.daily_song.find(s => s.date === currentDate);
    const songContainer = document.getElementById('song-container');
    if (dailysong) {
      const baseUrl = "https://music.youtube.com/watch?v=";
      songContainer.innerHTML = `<li>📻 <span id="today-song"><a href="${baseUrl}${dailysong.songId}" target="_blank">${dailysong.track}</a></span></li>`;
    } else {
      songContainer.innerHTML = '';
    }

    
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
    dailyReadingsLink.textContent = 'Daily Readings';

    console.log('Current Pacific Time:', pacificTime.toLocaleString());
    console.log('Lookup date for events, feasts, bdays:', currentDate);
    console.log('Current day for Quotidie:', currentDay);
    console.log('USCCB Date:', usccbDate);
  }
  updateTimeElements();
  setInterval(updateTimeElements, 60000);
});
</script>