document.addEventListener('DOMContentLoaded', function() {
  const siteData = JSON.parse(document.getElementById('siteData').textContent);
  const { dailyEvents, feastDays, quotidie, currentlyReading } = siteData;

  function getPacificTime() {
    const options = { 
      timeZone: 'America/Los_Angeles', 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    return new Date().toLocaleString('en-US', options);
  }

  function updateDateDependentContent() {
    const pacificTime = getPacificTime();
    console.log('Current Pacific Time:', pacificTime);
    
    const [weekday, fullDate, time] = pacificTime.split(', ');
    document.getElementById('current-date').textContent = `${weekday}, ${fullDate}`;

    const [month, day, year] = fullDate.split(' ');
    const currentDate = `${month.substring(0,3)}-${day.padStart(2, '0')}`;
    
    console.log('Date for lookups:', currentDate);
    updateDailyEvent(currentDate);
    updateFeastDay(currentDate);
    updateQuotidieList(weekday.toLowerCase());
  }

  function updateDailyEvent(date) {
    const event = dailyEvents.find(e => e.date === date);
    const eventText = event ? event.event : "No specific event today";
    document.getElementById('daily-event').textContent = eventText;
    console.log('Daily Event:', eventText);
  }

  function updateFeastDay(date) {
    const feast = feastDays.find(f => f.date === date);
    const feastText = feast ? feast.feast : "No feast day today";
    document.getElementById('feast-day').textContent = feastText;
    console.log('Feast Day:', feastText);
  }

  function updateQuotidieList(day) {
    console.log('Quotidie day:', day);
    const tasks = quotidie[day];
    const quotidieList = document.getElementById('quotidie-list');
    quotidieList.innerHTML = ''; // Clear existing tasks

    tasks.forEach(task => {
      const li = document.createElement('li');
      if (task.task.includes("Read") && currentlyReading) {
        li.innerHTML = `📚 Read <i><a href="${currentlyReading.url}">${currentlyReading.title}</a></i> (0:30)`;
      } else if (task.task.includes("[INPUT]")) {
        li.innerHTML = task.task.replace("[INPUT]", '<input type="text" name="task">');
      } else {
        li.textContent = task.task;
      }
      quotidieList.appendChild(li);
    });
  }

  // Run initially and then every minute
  updateDateDependentContent();
  setInterval(updateDateDependentContent, 60000);
});
</script>
