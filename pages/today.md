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
<ul id="quotidie" style="list-style:none">
  <!-- Daily tasks will be inserted here -->
</ul>

<script>
  const dailyEvents = {{ site.data.daily_events | jsonify }};
  const feastDays = {{ site.data.feast_days | jsonify }};
  const rosaryMysteries = {{ site.data.rosary_mysteries | jsonify }};
  const dailyQuotidie = {{ site.data.quotidie | jsonify }};
  const currentlyReading = {{ currently_reading | jsonify }};

  document.getElementById('debug').innerText = JSON.stringify({
    dailyEvents: dailyEvents,
    feastDays: feastDays,
    rosaryMysteries: rosaryMysteries,
    dailyQuotidie: dailyQuotidie,
    currentlyReading: currentlyReading
  }, null, 2);

  function displayDailyInfo() {
  console.log('displayDailyInfo function called');
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
    const todayTasks = dailyQuotidie[today];
    console.log('Today:', today);
    console.log('Today\'s tasks:', todayTasks);
    const quotidie = document.getElementById('quotidie');
    if (quotidie && todayTasks) {
      let taskHtml = '';
      todayTasks.forEach(task => {
        let processedTask = task.task
          .replace('[INPUT]', '<input type="text" name="task">')
          .replace('[CURRENT_READING]', `<a href="${currentlyReading.url}">${currentlyReading.title}</a>`)
          .replace('[ROSARY_MYSTERY]', `<a href="/prayers/rosary"><span class="rosaryMystery"></span></a>`);
        taskHtml += `<li><input type="checkbox"/>${processedTask}</li>`;
      });
      quotidie.innerHTML = taskHtml;
    } else {
      console.log('Quotidie element or tasks not found');
    }
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
      feastDiv.innerHTML = todayFeast ? `${todayFeast.feast}` : 'N/A';
    }

// Update rosary mystery
const rosaryDivs = document.getElementsByClassName('rosaryMystery');
Array.from(rosaryDivs).forEach(div => {
  div.textContent = `${todayMystery.set} Mysteries`;
});

    // Debug logging (consider removing or commenting out in production)
    console.log('Current Pacific Time:', pacificDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    console.log('Formatted date for lookup:', todayDate);
    console.log('Day of week:', dayOfWeek);
  }

  // Ensure the DOM is fully loaded before running the script
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayDailyInfo);
    console.log('Added DOMContentLoaded event listener');
  } else {
    displayDailyInfo();
    console.log('Called displayDailyInfo immediately');
  }

</script>