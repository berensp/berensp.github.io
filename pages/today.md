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
const rosaryMysteries = {{ site.data.rosary_mysteries | jsonify }};
const dailyQuotidie = {{ site.data.quotidie | jsonify }};
const currentlyReading = {{ currently_reading | jsonify }};

console.log('Data loaded');

function displayDailyInfo() {
  console.log('displayDailyInfo function called');
  
  // Format date
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Los_Angeles' };
  const formattedDate = now.toLocaleDateString('en-US', options);
  document.getElementById('formattedDate').textContent = formattedDate;

  // Get day of week
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = daysOfWeek[now.getDay()];

  // Update Quotidie tasks
  const todayTasks = dailyQuotidie[today];
  const quotidie = document.getElementById('quotidie');
  if (quotidie && todayTasks) {
    let taskHtml = todayTasks.map(task => `<li><input type="checkbox"> ${task.task}</li>`).join('');
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

// Call the function immediately
displayDailyInfo();
console.log('Script finished');
</script>