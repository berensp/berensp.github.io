---
layout: page
title: What I'm doing now
permalink: /now/
---
<ul>
<li>📆 <span id="dailyEvent"></span></li>
<li>📝 Quote I'm contemplating: "Sometimes when you find yourself in a dark place you think you've been buried, but you've actually been planted" (—Christine Caine)</li>
<li>📻 On my recordplayer: <a href="https://youtu.be/UOf6CMbHPuA?si=rd4JhAFLgUZxNWlm" target="_blank"><i>Turn the Lights Back On</i> (Billy Joel)</a></li>
<li>🌱 What I'm trying to learn:</li>
<li>🎯 Goals</li>
</ul>

<script>
  const dailyEvents = {{ site.data.daily_events | jsonify }};

  function displayDailyEvent() {
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

    const todayEvent = dailyEvents.find(e => e.date === todayDate);

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

    // For debugging: display Pacific Time and formatted date
    console.log('Current Pacific Time:', pacificDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    console.log('Formatted date for event lookup:', todayDate);
  }

  // Ensure the DOM is fully loaded before running the script
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayDailyEvent);
  } else {
    displayDailyEvent();
  }
</script>