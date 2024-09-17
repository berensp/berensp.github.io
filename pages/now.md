---
layout: page
title: Now
permalink: /now/
---
<ul>
<li>📆 <span id="dailyEvent"></span></li>
<li>🕯️ <span id="feastDay"></span></li>
<li>📝 Quote: [forthcoming]</li>
<li>📻 Song: [forthcoming]</li>
<li>🚀 <a href="/quotidie/">Quotidie</a></li>
</ul>

<script>
  const dailyEvents = {{ site.data.daily_events | jsonify }};
  const feastDays = {{ site.data.feast_days | jsonify }};

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
