---
layout: page
title: Now
permalink: /now/
---
<ul>
<li>📆 <span id="dailyEvent"></span></li>
<li>🕯️ <span id="feastDay"></span></li>
<li>📿 Rosary: <a href="/prayers/rosary/"><span id="rosaryMystery"></span></a></li>
<li>📝 Quote: [forthcoming]</li>
<li>📻 Song: [forthcoming]</li>
<li>🚀 <a href="/quotidie/">Quotidie</a></li>
</ul>

<script>
  const dailyEvents = {{ site.data.daily_events | jsonify }};
  const feastDays = {{ site.data.feast_days | jsonify }};
  const rosaryMysteries = {{ site.data.rosary_mysteries | jsonify }};

  function displayDailyInfo() {
    // Create a formatter for Pacific Time
    const pacificFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      month: '2-digit',
      day: '2-digit'
    });

    // Get the current date in Pacific Time
    const pacificNow = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    const pacificDate = new Date(pacificNow);
    
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
      rosaryDiv.innerHTML = `${todayMystery.set} Mysteries`;
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
