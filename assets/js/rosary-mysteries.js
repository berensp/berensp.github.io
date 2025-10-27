function updateRosaryInfo() {
  const currentTime = new Date();
  const dayOfWeek = currentTime.getDay();
  const todayMystery = mysteriesData[dayOfWeek];
  const tomorrowMystery = mysteriesData[(dayOfWeek + 1) % 7];

  if (!todayMystery) return;

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const formattedTime = timeFormatter.format(currentTime);

  document.getElementById('todayInfo').innerHTML = `🔿 Pray the <strong>${todayMystery.set} Mysteries</strong>—assuming you're in the Pacific Time Zone (where it's currently ${todayMystery.day} ${formattedTime}).`;

  let mysteryContent = '';
  todayMystery.mysteries.forEach((mystery, index) => {
    mysteryContent += `
      <h2>${mystery.name}</h2>
      <p><em>Fruit of the Mystery: ${mystery.fruit}</em></p>
      <ul style="list-style:none">
        <li>
          <input type="checkbox" id="paternoster-${index + 1}"/>
          <label for="paternoster-${index + 1}">
            <a href="/prayers/pater-noster/">Our Father</a>
          </label>
        </li>
        ${Array(10).fill().map((_, i) => `
          <li>
            <input type="checkbox" id="hailmary-${index + 1}-${i + 1}"/>
            <label for="hailmary-${index + 1}-${i + 1}">
              <a href="/prayers/ave-maria/">Hail Mary</a>
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

  const tomorrowMysteryNames = tomorrowMystery.mysteries.map(m => m.name).join(', ');
  document.getElementById('tomorrowInfo').textContent = `Tomorrow we pray the ${tomorrowMystery.set} Mysteries: ${tomorrowMysteryNames}`;
}

document.addEventListener('DOMContentLoaded', updateRosaryInfo);