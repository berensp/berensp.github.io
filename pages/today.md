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
document.addEventListener('DOMContentLoaded', function() {
  console.log('Script starting');
  
  document.getElementById('formattedDate').textContent = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    timeZone: 'America/Los_Angeles' 
  });
  
  document.getElementById('dailyEvent').textContent = 'Test Event';
  document.getElementById('feastDay').textContent = 'Test Feast';
  document.getElementById('quotidie').innerHTML = '<li>Test Task</li>';
  document.getElementById('debug').textContent = 'Debug: Script executed';
  
  console.log('Script finished');
});
</script>