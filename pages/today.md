---
layout: page
title: Today
permalink: /today/
---
## <span id="formattedDate"></span>
<ul>
<li>📆 <span id="dailyEvent"></span></li>
<li>🕯️ <span id="feastDay"></span></li>
<li>📝 Quote: [forthcoming]</li>
<li>📻 Song: [forthcoming]</li>
</ul>

## Quotidie
{% assign currently_reading = site.books | where: "category", "Presently Reading" | first %}
<ul style="list-style:none">
  <li><input type="checkbox"/>🙏 <a href="/prayers/orate-ante-labori/">Orate ante labori</a> (0:01)</li>
  <li><input type="checkbox"/>⏲ Deep work (1:30)</li>
  <li><input type="checkbox"/>📋 Thing #1: <input type="text" id="taskInput" name="task"></li>
  <li><input type="checkbox"/>📋 Thing #2: <input type="text" id="taskInput" name="task"></li>
  <li><input type="checkbox"/>📋 Thing #3: <input type="text" id="taskInput" name="task"></li>
  <li><input type="checkbox"/>🌱 Study Korean (0:15)</li>
  <li><input type="checkbox"/>💪 Pushups (30x)</li>
  <li><input type="checkbox"/>🗃️ Put things back in their places</li>
  <li><input type="checkbox"/>📖 Read <a href="{{ currently_reading.url | relative_url }}"><i>{{ currently_reading.title }}</i></a> (0:30)</li>
  <li><input type="checkbox"/>📿 <a href="/prayers/rosary">Rosary</a> (0:15)</li>
  <li><input type="checkbox"/>😴 Sleep (8:00)</li>
</ul>

<script>
  const dailyEvents = {{ site.data.daily_events | jsonify }};
  const feastDays = {{ site.data.feast_days | jsonify }};
  const rosaryMysteries = {{ site.data.rosary_mysteries | jsonify }};

  function displayDailyInfo() {
  // Create a formatter for Pacific Time with the desired format
  const pacificFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  // Get the current date in Pacific Time
  const pacificNow = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
  const pacificDate = new Date(pacificNow);
  
  // Format the date as "Day. YYYY-MM-DD" for the header
  const formattedDate = pacificFormatter.format(pacificDate)
    .replace(/(\w+), (\d{2})\/(\d{2})\/(\d{4})/, '$1. $4-$2-$3');

  console.log('Formatted date:', formattedDate);
    
    // Format the date as MM-DD
    const todayDate = pacificFormatter.format(pacificDate).replace('/', '-');

    // Get day of week (0-6, where 0 is Sunday)
    const dayOfWeek = pacificDate.getDay();

    // Find daily event
    const todayEvent = dailyEvents.find(e => e.date === todayDate);

    // Find feast day
    const todayFeast = feastDays.find(f => f.date === todayDate);

    // Find rosary mystery
    const todayMystery = rosaryMysteries[dayOfWeek];

    // Update daily event
    const eventDiv = document.getElementById('dailyEvent');
    if (eventDiv) {
      if (todayEvent) {
        eventDiv.innerHTML = `${todayEvent.event}`;
      } else {
        eventDiv.innerHTML = ''; // Clear the div if there's no event today
      }
    } else {
      console.warn("Element with id 'dailyEvent' not found in the DOM");
    }

    // Update feast day
    const feastDiv = document.getElementById('feastDay');
    if (feastDiv) {
      if (todayFeast) {
        feastDiv.innerHTML = `Feast Day: ${todayFeast.feast}`;
      } else {
        feastDiv.innerHTML = ''; // Clear the div if there's no feast day today
      }
    } else {
      console.warn("Element with id 'feastDay' not found in the DOM");
    }

    // Update rosary mystery
    const rosaryDiv = document.getElementById('rosaryMystery');
    if (rosaryDiv) {
      rosaryDiv.innerHTML = `Today's Rosary: ${todayMystery.set} Mysteries`;
    } else {
      console.warn("Element with id 'rosaryMystery' not found in the DOM");
    }

    // For debugging: display Pacific Time and formatted date
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
