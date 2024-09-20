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
<ul style="list-style:none">
  <li><input type="checkbox"/>🙏 <a href="/prayers/orate-ante-labori/">Orate ante labori</a> (0:01)</li>
  <li><input type="checkbox"/>⏲ Deep work (1:30)</li>
  <li><input type="checkbox"/>📋 Thing #1: <input type="text" name="task"></li>
  <li><input type="checkbox"/>📋 Thing #2: <input type="text" name="task"></li>
  <li><input type="checkbox"/>📋 Thing #3: <input type="text" name="task"></li>
  <li><input type="checkbox"/>🌱 Study Korean (0:15)</li>
  <li><input type="checkbox"/>💪 Pushups (30x)</li>
  <li><input type="checkbox"/>🗃️ Put things back in their places</li>
  <li><input type="checkbox"/>📖 Read <a href="{{ currently_reading.url | relative_url }}"><i>{{ currently_reading.title }}</i></a> (0:30)</li>
  <li><input type="checkbox"/>📿 <a href="/prayers/rosary"><span id="rosaryMystery"></span></a> (0:15)</li>
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
    const pacificDate = new Date();
    
    // Format the date as "Day. YYYY-MM-DD" for the header
    const formattedDate = pacificFormatter.format(pacificDate)
      .replace(/(\w+), (\d{2})\/(\d{2})\/(\d{4})/, '$1. $4-$2-$3');

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

    // Find daily event
    const todayEvent = dailyEvents.find(e => e.date === todayDate);

    // Find feast day
    const todayFeast = feastDays.find(f => f.date === todayDate);

    // Find rosary mystery
    const todayMystery = rosaryMysteries[dayOfWeek];

    // Debug logging
    console.log('dailyEvents:', dailyEvents);
    console.log('feastDays:', feastDays);
    console.log('rosaryMysteries:', rosaryMysteries);
    console.log('todayDate:', todayDate);
    console.log('todayEvent:', todayEvent);
    console.log('todayFeast:', todayFeast);
    console.log('todayMystery:', todayMystery);

    // Update daily event
    const eventDiv = document.getElementById('dailyEvent');
    if (eventDiv) {
      if (todayEvent) {
        eventDiv.innerHTML = todayEvent.event;
      } else {
        eventDiv.textContent = 'No event today';
      }
      console.log('Updated dailyEvent:', eventDiv.innerHTML);
    } else {
      console.log('dailyEvent element not found');
    }

    // Update feast day
    const feastDiv = document.getElementById('feastDay');
    if (feastDiv) {
      feastDiv.textContent = todayFeast ? `Feast Day: ${todayFeast.feast}` : 'No feast day today';
      console.log('Updated feastDay:', feastDiv.textContent);
    } else {
      console.log('feastDay element not found');
    }

    // Update rosary mystery
    const rosaryDiv = document.getElementById('rosaryMystery');
    if (rosaryDiv) {
      rosaryDiv.textContent = `${todayMystery.set} Mysteries`;
      console.log('Updated rosaryMystery:', rosaryDiv.textContent);
    } else {
      console.log('rosaryMystery element not found');
    }

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