console.log('today.js loaded');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM content loaded');
  
  if (!window.siteData) {
    console.error('Site data not found');
    return;
  }

  const { dailyEvents, feastDays, quotidie, rosaryMysteries, currentlyReading } = window.siteData;

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

  try {
    // Set current date
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
      currentDateElement.textContent = getPacificTime();
    } else {
      console.error('current-date element not found');
    }

    // Set daily event and feast day
    const currentDate = getPacificDate();
    console.log('Current date:', currentDate);

    const event = dailyEvents.find(e => e.date === currentDate);
    const dailyEventElement = document.getElementById('daily-event');
    if (dailyEventElement) {
      dailyEventElement.textContent = event ? event.event : "No specific event today";
    } else {
      console.error('daily-event element not found');
    }

    const feast = feastDays.find(f => f.date === currentDate);
    const feastDayElement = document.getElementById('feast-day');
    if (feastDayElement) {
      feastDayElement.textContent = feast ? feast.feast : "No feast day today";
    } else {
      console.error('feast-day element not found');
    }

    // Set Quotidie tasks
    const currentDay = getDayOfWeek();
    console.log('Current day:', currentDay);
    const tasks = quotidie[currentDay];
    const quotidieList = document.getElementById('quotidie-list');
    if (quotidieList) {
      quotidieList.innerHTML = ''; // Clear loading message
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
    } else {
      console.error('quotidie-list element not found');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
});
