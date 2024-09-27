---
layout: page
title: Today
permalink: /today/
---

<h2 id="current-date">Loading...</h2>

<ul>
<li>📆 <strong>Event:</strong> <span id="daily-event">Loading...</span></li>
<li>🕯️ <strong>Feast:</strong> <span id="feast-day">Loading...</span></li>
<li>📝 <strong>Quote:</strong> [forthcoming]</li>
<li>📻 <strong>Song:</strong> [forthcoming]</li>
</ul>

<h2>Quotidie</h2>
<ul id="quotidie-list">
  <li>Loading...</li>
</ul>

<script>
window.siteData = {
  dailyEvents: {{ site.data.daily_events | jsonify }},
  feastDays: {{ site.data.feast_days | jsonify }},
  quotidie: {{ site.data.quotidie | jsonify }},
  rosaryMysteries: {{ site.data.rosary_mysteries | jsonify }},
  currentlyReading: {{ site.books | where: "category", "Presently Reading" | first | jsonify }}
};
console.log('Site data loaded:', window.siteData);
</script>
<script src="{{ '/assets/js/today.js' | relative_url }}"></script>
