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
    'The Proclamation of the Coming of the Kingdom of God',
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

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const formattedTime = timeFormatter.format(currentTime);

  document.getElementById('todayInfo').innerHTML = `📿 Pray the <strong>${todayMystery.set} Mysteries</strong>—assuming you're in the Pacific Time Zone (where it's currently ${todayMystery.day} ${formattedTime}).`;

  let mysteryContent = '';
  todayMystery.mysteries.forEach((mystery, index) => {
    mysteryContent += `
      <h2>${mystery}</h2>
      <ul style="list-style:none">
        <li>
          <input type="checkbox" id="paternoster-${index + 1}"/>
          <label for="paternoster-${index + 1}">
            <a href="/prayers/pater-noster/">Pater Noster</a>
          </label>
        </li>
        ${Array(10).fill().map((_, i) => `
          <li>
            <input type="checkbox" id="hailmary-${index + 1}-${i + 1}"/>
            <label for="hailmary-${index + 1}-${i + 1}">
              <a href="/prayers/ave-maria/">Ave Maria</a>
            </label>
          </li>
        `).join('')}
        <li>
          <input type="checkbox" id="gloriapatri-${index + 1}"/>
          <label for="gloriapatri-${index + 1}">
            <a href="/prayers/gloria-patri/">Gloria Patri</a>
          </label>
        </li>
      </ul>
    `;
  });
  document.getElementById('mysteryContent').innerHTML = mysteryContent;

  document.getElementById('tomorrowInfo').textContent = `Tomorrow we pray the ${tomorrowMystery.set} Mysteries: ${tomorrowMystery.mysteries.join(', ')}`;
}

document.addEventListener('DOMContentLoaded', updateRosaryInfo);
