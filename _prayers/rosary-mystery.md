---
layout: prayer
title: Rosary Mysteries
category: Marian
---
<div id="debugInfo" style="background-color: #f0f0f0; padding: 10px; margin-bottom: 20px; font-family: monospace;"></div>

<h1 id="mysteryTitle"></h1>

<p id="todayInfo"></p>

## Opening

<ul style="list-style:none">
  <li><input type="checkbox"/><a href="/prayers/signum-crucis/">Signum Crucis</a></li>
  <li><input type="checkbox"/><a href="/prayers/apostles-creed/">Apostles' Creed</a></li>
  <li><input type="checkbox"/><a href="/prayers/pater-noster/">Our Father</a></li>
  <li><input type="checkbox"/><a href="/prayers/ave-maria/">Ave Maria</a></li>
  <li><input type="checkbox"/><a href="/prayers/ave-maria/">Ave Maria</a></li>
  <li><input type="checkbox"/><a href="/prayers/ave-maria/">Ave Maria</a></li>
  <li><input type="checkbox"/><a href="/prayers/gloria-patri/">Gloria Patri</a></li>
</ul>

<div id="mysteryContent"></div>

## Closing

<ul style="list-style:none">
  <li><input type="checkbox"/><a href="/prayers/salve-regina/">Hail, Holy Queen</a></li>
  <li><input type="checkbox"/><a href="/prayers/rosary-end/">Oratio ad Finem Rosarii Dicenda</a></li>
</ul>

<p id="tomorrowInfo" class="muted small"></p>

<script src="../timediff.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const mysteries = [
    {day: 'Sunday', set: 'Glorious', mysteries: [
      'The Resurrection',
      'The Ascension',
      'The Descent of the Holy Spirit',
      'The Assumption of Mary',
      'The Coronation of the Virgin'
    ]},
    {day: 'Monday', set: 'Joyful', mysteries: [
      'The Annunciation',
      'The Visitation',
      'The Nativity',
      'The Presentation in the Temple',
      'The Finding in the Temple'
    ]},
    {day: 'Tuesday', set: 'Sorrowful', mysteries: [
      'The Agony in the Garden',
      'The Scourging at the Pillar',
      'The Crowning with Thorns',
      'The Carrying of the Cross',
      'The Crucifixion and Death'
    ]},
    {day: 'Wednesday', set: 'Glorious', mysteries: [
      'The Resurrection',
      'The Ascension',
      'The Descent of the Holy Spirit',
      'The Assumption of Mary',
      'The Coronation of the Virgin'
    ]},
    {day: 'Thursday', set: 'Luminous', mysteries: [
      'The Baptism of Christ in the Jordan',
      'The Wedding Feast at Cana',
      'Jesus' Proclamation of the Coming of the Kingdom of God',
      'The Transfiguration',
      'The Institution of the Eucharist'
    ]},
    {day: 'Friday', set: 'Sorrowful', mysteries: [
      'The Agony in the Garden',
      'The Scourging at the Pillar',
      'The Crowning with Thorns',
      'The Carrying of the Cross',
      'The Crucifixion and Death'
    ]},
    {day: 'Saturday', set: 'Joyful', mysteries: [
      'The Annunciation',
      'The Visitation',
      'The Nativity',
      'The Presentation in the Temple',
      'The Finding in the Temple'
    ]}
  ];

  function updateRosaryInfo() {
    const currentTime = new Date();
    const dayOfWeek = currentTime.getDay();
    const todayMystery = mysteries[dayOfWeek];
    const tomorrowMystery = mysteries[(dayOfWeek + 1) % 7];

    document.getElementById('debugInfo').innerHTML = `
      <strong>Debug Info:</strong><br>
      Local time (PST/PDT): ${currentTime.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}<br>
      Day of week: ${dayOfWeek}<br>
      Today's Mystery: ${todayMystery.set}<br>
      Tomorrow's Mystery: ${tomorrowMystery.set}
    `;

    document.getElementById('mysteryTitle').textContent = `${todayMystery.set} Mysteries`;
    document.getElementById('todayInfo').textContent = `...since today is ${todayMystery.day} in San Francisco.`;

    let mysteryContent = '<ol>';
    todayMystery.mysteries.forEach((mystery, index) => {
      mysteryContent += `
        <li>
          <strong>${mystery}</strong>
          <ul style="list-style-type: none;">
            ${Array(10).fill().map((_, i) => `
              <li>
                <input type="checkbox" id="hailmary-${index + 1}-${i + 1}"/>
                <label for="hailmary-${index + 1}-${i + 1}">
                  <a href="/prayers/ave-maria/">Ave Maria</a>
                </label>
              </li>
            `).join('')}
          </ul>
        </li>
      `;
    });
    mysteryContent += '</ol>';
    document.getElementById('mysteryContent').innerHTML = mysteryContent;

    document.getElementById('tomorrowInfo').textContent = `Tomorrow we will pray the ${tomorrowMystery.set} Mysteries: ${tomorrowMystery.mysteries.join(', ')}`;
  }

  // Call updateRosaryInfo after timediff.js has run its calculations
  const existingDOMContentLoadedHandler = document.onDOMContentLoaded;
  document.onDOMContentLoaded = function() {
    if (existingDOMContentLoadedHandler) existingDOMContentLoadedHandler();
    updateRosaryInfo();
  };
});
</script>
