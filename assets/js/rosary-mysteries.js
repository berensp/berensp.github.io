function updateRosaryInfo() {
  const currentTime = new Date();
  const dayOfWeek = currentTime.getDay();
  const today = mysteriesData.days[dayOfWeek];
  const tomorrow = mysteriesData.days[(dayOfWeek + 1) % 7];

  if (!today) return;

  const todayMysteries = mysteriesData.sets[today.set];
  const tomorrowMysteries = mysteriesData.sets[tomorrow.set];

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const formattedTime = timeFormatter.format(currentTime);

  document.getElementById('todayInfo').innerHTML = `Pray the <strong>${today.set} Mysteries</strong>—assuming you're in the Pacific Time Zone (where it's currently ${today.day} ${formattedTime}).`;

  let mysteryContent = '';
  todayMysteries.forEach((mystery, index) => {
    mysteryContent += `
      <h2>${index + 1}. ${mystery.name}</h2>
      <p><em>${mystery.fruit}</em></p>
      <p><strong>Thought:</strong> ${mystery.thought}</p>
      <p><strong>Resolution:</strong> ${mystery.resolution}</p>
      <p><strong>Offering:</strong> ${mystery.offering}</p>
      <p><strong>Acclamation:</strong> ${mystery.acclamation}</p>
      <ul style="list-style:none">
        <li>
          <input type="checkbox" id="paternoster-${index + 1}"/>
          <label for="paternoster-${index + 1}">
            <a href="/prayers/pater-noster/">Our Father</a>
          </label>
        </li>
        <li>
          <input type="checkbox" id="hailmary-${index + 1}"/>
          <label for="hailmary-${index + 1}">
            <a href="/prayers/ave-maria/">Hail Mary</a> ×10
          </label>
          <br/>
          <span class="muted small">“…and blessed is the fruit of thy womb, Jesus, ${mystery.holy_name}. Holy Mary…”</span>
        </li>
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

  const tomorrowMysteryNames = tomorrowMysteries.map(m => m.name).join(', ');
  document.getElementById('tomorrowInfo').textContent = `Tomorrow we pray the ${tomorrow.set} Mysteries: ${tomorrowMysteryNames}`;
}

document.addEventListener('DOMContentLoaded', updateRosaryInfo);
