---
layout: page
title: Today
permalink: /today/
---
{% assign currently_reading = site.books | where: "category", "Presently Reading" | first %}

<h2><span id="formattedDate"></span></h2>
<ul>
<li>📆 <strong>Event:</strong> <span id="dailyEvent"></span></li>
<li>🕯️ <strong>Feast:</strong> <span id="feastDay"></span></li>
<li>📝 <strong>Quote:</strong> [forthcoming]</li>
<li>📻 <strong>Song:</strong> [forthcoming]</li>
</ul>

<h2>Quotidie</h2>
<div id="debug"></div>
<ul id="quotidie" style="list-style:none">
  <!-- Daily tasks will be inserted here -->
</ul>

<script>
console.log('Script starting');

const dailyEvents = {{ site.data.daily_events | jsonify }};
const feastDays = {{ site.data.feast_days | jsonify }};
const dailyQuotidie = {{ site.data.quotidie | jsonify }};
const currentlyReading = {{ currently_reading | jsonify }};

function displayDailyInfo() {
  console.log('displayDailyInfo function called');
  
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Los_Angeles' };
  const formattedDate = now.toLocaleDateString('en-US', options);
  document.getElementById('formattedDate').textContent = formattedDate;

  // Get day of week and date for lookups
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = daysOfWeek[now.getDay()];
  const todayDate = now.toLocaleString('en-US', { month: '2-digit', day: '2-digit' }).replace('/', '-');

  // Update daily event
  const todayEvent = dailyEvents.find(e => e.date === todayDate);
  document.getElementById('dailyEvent').textContent = todayEvent ? todayEvent.event : 'No event today';

  // Update feast day
  const todayFeast = feastDays.find(f => f.date === todayDate);
  document.getElementById('feastDay').textContent = todayFeast ? todayFeast.feast : 'N/A';

  // Update Quotidie tasks
  const todayTasks = dailyQuotidie[today];
  const quotidie = document.getElementById('quotidie');
  if (quotidie && todayTasks) {
    let taskHtml = todayTasks.map(task => {
      let processedTask = task.task
        .replace('[INPUT]', '<input type="text" name="task">')
        .replace('[CURRENT_READING]', `<a href="${currentlyReading.url}">${currentlyReading.title}</a>`);
      return `<li><input type="checkbox"> ${processedTask}</li>`;
    }).join('');
    quotidie.innerHTML = taskHtml;
  } else {
    quotidie.innerHTML = '<li>No tasks for today</li>';
  }

  // Update debug info
  document.getElementById('debug').innerText = JSON.stringify({
    currentlyReading: currentlyReading,
    todayTasks: todayTasks
  }, null, 2);
}

displayDailyInfo();
console.log('Script finished');
</script>