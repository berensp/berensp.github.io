---
layout: page
title: Today
permalink: /today/
---
{% assign currently_reading = site.books | where: "category", "Presently Reading" | first %}

<h2 id="current-date"></h2>

<ul>
<li>📆 <strong>Event:</strong> <span id="daily-event"></span></li>
<li>🕯️ <strong>Feast:</strong> <span id="feast-day"></span></li>
<li>📝 <strong>Quote:</strong> [forthcoming]</li>
<li>📻 <strong>Song:</strong> [forthcoming]</li>
</ul>

<h2>Quotidie</h2>
<ul id="quotidie">
</ul>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const dailyEvents = {{ site.data.daily_events | jsonify }};
  const feastDays = {{ site.data.feast_days | jsonify }};
  const quotidie = {{ site.data.quotidie | jsonify }};
  const rosaryMysteries = {{ site.data.rosary_mysteries | jsonify }};
  const currentlyReading = {{ currently_reading | jsonify }};

  function getPacificTime() {
    const options = { timeZone: 'America/Los_Angeles', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleString('en-US', options);
  }

  function getPacificDate() {
    const options = { timeZone: 'America/Los_Angeles', month: '2-digit', day: '2-digit' };
    return new Date().toLocaleString('en-US', options).split('/').join('-');
  }

  function getDayOfWeek() {
    const options = { timeZone: 'America/Los_Angeles', weekday: 'long' };
    return new Date().toLocaleString('en-US', options).toLowerCase();
  }

  // Set current date
  document.getElementById('current-date').textContent = getPacificTime();

  // Set daily event and feast day
  const currentDate = getPacificDate();
  const event = dailyEvents.find(e => e.date === currentDate);
  document.getElementById('daily-event').textContent = event ? event.event : "No specific event today";
  const feast = feastDays.find(f => f.date === currentDate);
  document.getElementById('feast-day').textContent = feast ? feast.feast : "No feast day today";

  // Set Quotidie tasks
  const currentDay = getDayOfWeek();
  const tasks = quotidie[currentDay];
  const quotidieList = document.getElementById('quotidie');
  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.task.includes("[INPUT]")) {
      li.innerHTML = task.task.replace("[INPUT]", '<input type="text" name="task">');
    } else {
      li.textContent = task.task;
    }
    quotidieList.appendChild(li);
  });

  // Update Rosary and Reading links
  Array.from(quotidieList.getElementsByTagName('li')).forEach(task => {
    if (task.textContent.includes('Rosary')) {
      const dayNumber = new Date().getDay();
      const todayMystery = rosaryMysteries[dayNumber];
      task.innerHTML = task.innerHTML.replace(
        'Rosary',
        `<a href="/prayers/rosary/">${todayMystery.set} Mysteries</a>`
      );
    } else if (task.textContent.includes('Read')) {
      if (currentlyReading && currentlyReading.title) {
        task.innerHTML = task.innerHTML.replace(
          /Read .+/,
          `Read <a href="${currentlyReading.url}">${currentlyReading.title}</a>`
        );
      }
    }
  });
});
</script>
