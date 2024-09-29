---
layout: page
title: Today
permalink: /today/
---
{% assign pacific_time = site.time | date: '%s' | minus: 25200 | date: '%Y-%m-%d %H:%M:%S' %}
{% assign currently_reading = site.books | where: "category", "Presently Reading" | first %}
<h2 id="current-date">{{ pacific_time | date: "%A, %B %d, %Y" }}</h2>
<ul>
<li>📆 <strong>Event:</strong> 
  <span id="daily-event">
    {% assign current_date = pacific_time | date: "%m-%d" %}
    {% assign event = site.data.daily_events | where: "date", current_date | first %}
    {{ event.event | default: "No specific event today" }}
  </span>
</li>
<li>🕯️ <strong>Feast:</strong> 
  <span id="feast-day">
    {% assign feast = site.data.feast_days | where: "date", current_date | first %}
    {{ feast.feast | default: "No feast day today" }}
  </span>
</li>
<li>📝 <strong>Quote:</strong> [forthcoming]</li>
<li>📻 <strong>Song:</strong> [forthcoming]</li>
</ul>
<h2>Quotidie</h2>
<ul id="quotidie-list">
  {% assign current_day = pacific_time | date: "%A" | downcase %}
  {% for task in site.data.quotidie[current_day] %}
    <li>
      {% if task.task contains "Read" %}
        {% if currently_reading %}
          📚 Read <i><a href="{{ currently_reading.url }}">{{ currently_reading.title }}</a></i> (0:30)
        {% else %}
          {{ task.task }}
        {% endif %}
      {% elsif task.task contains "[INPUT]" %}
        {{ task.task | replace: "[INPUT]", '<input type="text" name="task">' }}
      {% else %}
        {{ task.task }}
      {% endif %}
    </li>
  {% endfor %}
</ul>

<script>
document.addEventListener('DOMContentLoaded', function() {
  function getPacificTime() {
    return new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
  }

  function updateTimeElements() {
    const pacificTime = new Date(getPacificTime());
    
    // Update current date
    document.getElementById('current-date').textContent = pacificTime.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Update daily event and feast day
    const currentDate = pacificTime.toLocaleString('en-US', { month: '2-digit', day: '2-digit' });
    updateDailyEvent(currentDate);
    updateFeastDay(currentDate);

    // Update Quotidie list
    const currentDay = pacificTime.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
    updateQuotidieList(currentDay);

    console.log('Current Pacific Time:', pacificTime.toLocaleString());
    console.log('Lookup date for events and feasts:', currentDate);
  }

  function updateDailyEvent(date) {
    const dailyEvents = {{ site.data.daily_events | jsonify }};
    const event = dailyEvents.find(e => e.date === date);
    document.getElementById('daily-event').textContent = event ? event.event : "No specific event today";
  }

  function updateFeastDay(date) {
    const feastDays = {{ site.data.feast_days | jsonify }};
    const feast = feastDays.find(f => f.date === date);
    document.getElementById('feast-day').textContent = feast ? feast.feast : "No feast day today";
  }

  function updateQuotidieList(day) {
    const quotidie = {{ site.data.quotidie | jsonify }};
    const tasks = quotidie[day];
    const quotidieList = document.getElementById('quotidie-list');
    quotidieList.innerHTML = ''; // Clear existing tasks

    tasks.forEach(task => {
      const li = document.createElement('li');
      if (task.task.includes("Read")) {
        const currentlyReading = {{ currently_reading | jsonify }};
        if (currentlyReading) {
          li.innerHTML = `📚 Read <i><a href="${currentlyReading.url}">${currentlyReading.title}</a></i> (0:30)`;
        } else {
          li.textContent = task.task;
        }
      } else if (task.task.includes("[INPUT]")) {
        li.innerHTML = task.task.replace("[INPUT]", '<input type="text" name="task">');
      } else {
        li.textContent = task.task;
      }
      quotidieList.appendChild(li);
    });
  }

  // Initial update
  updateTimeElements();

  // Update every minute
  setInterval(updateTimeElements, 60000);
});
</script>
