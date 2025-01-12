---
layout: page
title: Today
permalink: /today/
---
<h2 id="current-date">Loading...</h2>
<table class="schedule-table">
  <thead>
    <tr>
      <th style="width: 50px">Time</th>
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
.current-time-row {
  background-color: #fff3cd;
}
.schedule-table input:not([type="checkbox"]) {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 1em;
    line-height: 1.2em;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.25rem;
}
.schedule-table input:not([type="checkbox"]):focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.8);
}
</style>

<script>

document.addEventListener('DOMContentLoaded', function() {
  const siteData = {{ site.data | jsonify }};
  
  function getTimeZoneAbbreviation() {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZoneName: 'short',
      timeZone: 'America/Los_Angeles'
    });
    const parts = formatter.formatToParts(new Date());
    return parts.find(part => part.type === 'timeZoneName').value;
  }
  
  function getPacificTime() {
    return new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
  }
  
  function isCurrentTimeSlot(taskTime, nextTaskTime) {
    const now = new Date(getPacificTime());
    const currentHourMinute = now.getHours() * 60 + now.getMinutes();
    
    const [taskHours, taskMinutes] = taskTime.split(':').map(Number);
    const taskTotalMinutes = taskHours * 60 + taskMinutes;
    
    let nextTaskTotalMinutes = 24 * 60; // Default to end of day
    if (nextTaskTime) {
      const [nextHours, nextMinutes] = nextTaskTime.split(':').map(Number);
      nextTaskTotalMinutes = nextHours * 60 + nextMinutes;
    }
    
    return currentHourMinute >= taskTotalMinutes && currentHourMinute < nextTaskTotalMinutes;
  }
  
  function updateTimeElements() {
    const pacificTime = new Date(getPacificTime());
    const timeZoneAbbr = getTimeZoneAbbreviation();
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
    
    // Update the table header to include the current time zone
    const timeHeader = document.querySelector('.schedule-table th');
    if (timeHeader) {
      timeHeader.textContent = timeZoneAbbr;
    }
    
    // Rest of your existing updateTimeElements code...
    const todaysTasks = siteData.quotidie[currentDay];
    
    if (todaysTasks) {
      const sortedTasks = todaysTasks.sort((a, b) => {
        const timeA = a.time || '23:59';
        const timeB = b.time || '23:59';
        return timeA.localeCompare(timeB);
      });
      
      sortedTasks.forEach((taskObj, index) => {
        const row = document.createElement('tr');
        let taskHtml = taskObj.task;
        
        if (taskObj.time && isCurrentTimeSlot(taskObj.time, sortedTasks[index + 1]?.time)) {
          row.classList.add('current-time-row');
        }
        
        if (taskHtml.includes('READINGS')) {
          const usccbDate = pacificTime.toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }).replace(/\//g, '');
          const usccbLink = `https://bible.usccb.org/bible/readings/${usccbDate}.cfm`;
          taskHtml = taskHtml.replace('READINGS', `<a href="${usccbLink}" target="_blank">readings</a>`);
        }
        
        row.innerHTML = `
          <td>${taskObj.time || ''}</td>
          <td>${taskHtml}</td>
        `;
        scheduleBody.appendChild(row);
      });
    }
  }

  updateTimeElements();
  setInterval(updateTimeElements, 60000);
});

</script>

<div id="event-container"></div>
<div id="feast-container"></div>
<div id="birthday-container"></div>
<div id="song-container"></div>
