---
layout: page
title: Today
permalink: /today2/
---
<h2 id="current-date">Loading...</h2>
<table class="schedule-table">
  <thead>
    <tr>
      <th style="width: 65px">Time</th>
      <th>Task</th>
    </tr>
  </thead>
  <tbody id="schedule-body">
    <tr>
      <td colspan="2">Loading...</td>
    </tr>
  </tbody>
</table>

<style>
.schedule-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}
.schedule-table th,
.schedule-table td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}
.schedule-table th {
  background-color: #f5f5f5;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const siteData = {{ site.data | jsonify }};
  
  function getPacificTime() {
    return new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
  }
  
  function updateTimeElements() {
    const pacificTime = new Date(getPacificTime());
    const currentDate = pacificTime.toLocaleString('en-US', { month: '2-digit', day: '2-digit' }).replace('/', '-');
    const currentDay = pacificTime.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
    
    document.getElementById('current-date').textContent = pacificTime.toLocaleString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const scheduleBody = document.getElementById('schedule-body');
    scheduleBody.innerHTML = '';
    
    // Get the day's tasks from quotidie2
    const todaysTasks = siteData.quotidie2[currentDay];
    console.log('Current day:', currentDay);
    console.log('Today\'s tasks:', todaysTasks);
    
    if (todaysTasks) {
      // Sort tasks by time
      const sortedTasks = todaysTasks.sort((a, b) => {
        const timeA = a.time || '23:59';
        const timeB = b.time || '23:59';
        return timeA.localeCompare(timeB);
      });
      
      sortedTasks.forEach(taskObj => {
        const row = document.createElement('tr');
        let taskHtml = taskObj.task;
        
        // Check if READINGS is anywhere in the task string
        if (taskHtml.includes('READINGS')) {
          const usccbDate = pacificTime.toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }).replace(/\//g, '');
          const usccbLink = `https://bible.usccb.org/bible/readings/${usccbDate}.cfm`;
          // Replace READINGS with the formatted link
          taskHtml = taskHtml.replace('READINGS', `<a href="${usccbLink}" target="_blank">Today's readings</a>`);
        }
        
        row.innerHTML = `
          <td>${taskObj.time || ''}</td>
          <td>${taskHtml}</td>
        `;
        scheduleBody.appendChild(row);
      });
    }

    const feast = siteData.feast_days.find(f => f.date === currentDate);
    document.getElementById('feast-day').innerHTML = feast ? feast.feast : "No feast day today";
    
    const eventContainer = document.getElementById('event-container');
    const event = siteData.daily_events.find(e => e.date === currentDate);
    eventContainer.innerHTML = event ? `📆 ${event.event}` : '';
    
    const birthdayContainer = document.getElementById('birthday-container');
    const birthday = siteData.bdays.find(b => b.date === currentDate);
    birthdayContainer.innerHTML = birthday ? `🎈 ${birthday.bday}` : '';
    
    const songContainer = document.getElementById('song-container');
    const dailysong = siteData.daily_song.find(s => s.date === currentDate);
    if (dailysong) {
      const baseUrl = "https://music.youtube.com/watch?v=";
      songContainer.innerHTML = `📻 <a href="${baseUrl}${dailysong.songId}" target="_blank">${dailysong.track}</a>`;
    } else {
      songContainer.innerHTML = '';
    }
  }

  updateTimeElements();
  setInterval(updateTimeElements, 60000);
});
</script>

<span class="muted small"><span id="event-container"></span></span>
<span class="muted small">🕯️ <span id="feast-day">Loading...</span></span>
<span class="muted small"><span id="birthday-container"></span></span>
<span class="muted small"><span id="song-container"></span></span>