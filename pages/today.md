---
layout: page
title: Today
permalink: /today/
---

<h2><span id="formattedDate"></span></h2>
<ul>
<li>📆 <strong>Event:</strong> <span id="dailyEvent"></span></li>
<li>🕯️ <strong>Feast:</strong> <span id="feastDay"></span></li>
<li>📝 <strong>Quote:</strong> [forthcoming]</li>
<li>📻 <strong>Song:</strong> [forthcoming]</li>
</ul>

<h2>Quotidie</h2>
<div id="debug"></div>
<ul id="quotidie" style="list-style:none">
  <!-- Daily tasks will be inserted here -->
</ul>

<script>
console.log('Script starting');
document.getElementById('debug').innerText = 'Debug: Script executed';

function displayDailyInfo() {
  console.log('displayDailyInfo function called');
  
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Los_Angeles' };
  const formattedDate = now.toLocaleDateString('en-US', options);
  
  document.getElementById('formattedDate').textContent = formattedDate;
  document.getElementById('quotidie').innerHTML = '<li>Test task</li>';
}

displayDailyInfo();
console.log('Script finished');
</script>