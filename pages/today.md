---
layout: page
title: Today
permalink: /today/
---
<h2><span id="formattedDate"></span></h2>
<ul>
<li>📆 Event: <span id="dailyEvent"></span></li>
<li>🕯️ <span id="feastDay"></span></li>
<li>📝 Quote: [forthcoming]</li>
<li>📻 Song: [forthcoming]</li>
</ul>

<h2>Quotidie</h2>
{% assign currently_reading = site.books | where: "category", "Presently Reading" | first %}
<ul id="quotidie" style="list-style:none">
  <!-- Daily tasks will be inserted here -->
</ul>

<script>
  const dailyEvents = {{ site.data.daily_events | jsonify }};
  const feastDays = {{ site.data.feast_days | jsonify }};
  const rosaryMysteries = {{ site.data.rosary_mysteries | jsonify }};

function displayDailyInfo() {
  // Create a formatter for Pacific Time with the desired format
  const pacificFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get the current date in Pacific Time
  const pacificDate = new Date();
  
  // Format the date as "Monday, September 30" for the header
  const formattedDate = pacificFormatter.format(pacificDate)
    .replace(/(\w+), (\w+) (\d{1,2}), (\d{4})/, '$1, $2 $3');

  // Update the formatted date in the header
  const dateHeader = document.getElementById('formattedDate');
  if (dateHeader) {
    dateHeader.textContent = formattedDate;
  }

  // Format the date as MM-DD for event lookup
  const todayDate = pacificDate.toLocaleString('en-US', { 
    timeZone: 'America/Los_Angeles',
    month: '2-digit',
    day: '2-digit'
  }).replace('/', '-');

  // Get day of week (0-6, where 0 is Sunday)
  const dayOfWeek = pacificDate.getDay();

  // Get the current day of the week as a string
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = daysOfWeek[dayOfWeek];

  // Update Quotidie tasks
  const dailyQuotidie = {{ site.data.daily_quotidie | jsonify }};
  const todayTasks = dailyQuotidie[today];
  const quotidie = document.getElementById('quotidie');
  if (quotidie && todayTasks) {
    let taskHtml = '';
    todayTasks.forEach(task => {
      taskHtml += `<li><input type="checkbox"/>${task.task}</li>`;
    });
    quotidie.innerHTML = taskHtml;
  }

  // Find daily event, feast day, and rosary mystery
  const todayEvent = dailyEvents.find(e => e.date === todayDate);
  const todayFeast = feastDays.find(f => f.date === todayDate);
  const todayMystery = rosaryMysteries[dayOfWeek];

  // Update daily event
  const eventDiv = document.getElementById('dailyEvent');
  if (eventDiv) {
    eventDiv.innerHTML = todayEvent ? todayEvent.event : 'No event today';
  }

  // Update feast day
  const feastDiv = document.getElementById('feastDay');
  if (feastDiv) {
    feastDiv.innerHTML = todayFeast ? `Feast Day: ${todayFeast.feast}` : 'No feast day today';
  }

  // Update rosary mystery
  const rosaryDiv = document.getElementById('rosaryMystery');
  if (rosaryDiv) {
    rosaryDiv.textContent = `${todayMystery.set} Mysteries`;
  }

  // Debug logging (consider removing or commenting out in production)
  console.log('Current Pacific Time:', pacificDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  console.log('Formatted date for lookup:', todayDate);
  console.log('Day of week:', dayOfWeek);
}

// Ensure the DOM is fully loaded before running the script
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', displayDailyInfo);
} else {
  displayDailyInfo();
}

</script>