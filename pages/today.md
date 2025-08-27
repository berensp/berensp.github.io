---
layout: page
title: Today
permalink: /today/
description: Check the diary.
---
<table class="schedule-table">
  <thead>
    <tr>
      <th style="width: 40px">Time</th>
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
.schedule-table td:first-child {
  text-align: center;
}
.schedule-table th {
  background-color: #f5f5f5;
}
.schedule-table th:first-child {
  text-align: center;
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
    box-shadow: 0 0 0 0.5px rgba(0, 123, 255, 0.8);
}
</style>

<script src="/assets/js/date_calculator.js"></script>
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
  
  function calculateRelativeDates(year) {
    // Process relative date rules if they exist
    if (!siteData.relative_dates) {
      return {};
    }
    
    const relativeDatesMap = {};
    
    siteData.relative_dates.forEach(item => {
      if (item.rule && item.event) {
        const calculatedDate = calculateDateFromRule(item.rule, year);
        if (calculatedDate) {
          const dateKey = formatDateMMDD(calculatedDate);
          relativeDatesMap[dateKey] = item.event;
        }
      }
    });
    
    return relativeDatesMap;
  }
  
  function updateTimeElements() {
    const pacificTime = new Date(getPacificTime());
    const timeZoneAbbr = getTimeZoneAbbreviation();
    const currentDate = pacificTime.toLocaleString('en-US', { month: '2-digit', day: '2-digit' }).replace('/', '-');
    const currentDay = pacificTime.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
    const currentYear = pacificTime.getFullYear();
    
    // Calculate relative dates for current year
    const relativeDates = calculateRelativeDates(currentYear);
    
    // Update page title (h1) with current date
    document.querySelector('h1').textContent = pacificTime.toLocaleString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });

    const scheduleBody = document.getElementById('schedule-body');
    scheduleBody.innerHTML = '';
    
    // Update the table header to show just the time zone
    const timeHeader = document.querySelector('.schedule-table th');
    if (timeHeader) {
      timeHeader.textContent = timeZoneAbbr;
    }
    
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

    const eventContainer = document.getElementById('event-container');
    
    // Check for relative date events first (they take priority)
    const relativeEvent = relativeDates[currentDate];
    
    // If no relative event, check fixed date events
    const fixedEvent = siteData.daily_events.find(e => e.date === currentDate);
    
    // Prioritize relative events over fixed events
    const eventToShow = relativeEvent || (fixedEvent ? fixedEvent.event : '');
    eventContainer.innerHTML = eventToShow ? `<span class="muted small">📆 ${eventToShow}</span>` : '';

    const feastContainer = document.getElementById('feast-container');
    const feast = siteData.feast_days.find(e => e.date === currentDate);
    feastContainer.innerHTML = feast ? `<span class="muted small">🕯️ ${feast.feast}</span>` : '';

    const birthdayContainer = document.getElementById('birthday-container');
    const birthday = siteData.bdays.find(b => b.date === currentDate);
    birthdayContainer.innerHTML = birthday ? `<span class="muted small">🎈 ${birthday.bday}</span>` : '';

    const songContainer = document.getElementById('song-container');
    const dailysong = siteData.daily_song.find(s => s.date === currentDate);
    if (dailysong) {
      const baseUrl = "https://music.youtube.com/watch?v=";
      songContainer.innerHTML = `<span class="muted small">📻 </span><a class="muted small" href="${baseUrl}${dailysong.songId}" target="_blank">${dailysong.track}</a>`;
    } else {
      songContainer.innerHTML = '';
    }
  }

  updateTimeElements();
  setInterval(updateTimeElements, 60000);
});
</script>

<script src="/assets/js/weather.js"></script>

<div id="weather-container"></div>
<div id="event-container"></div>
<div id="feast-container"></div>
<div id="birthday-container"></div>
<div id="song-container"></div>