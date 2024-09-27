---
layout: page
title: Today
permalink: /today/
---

<h2 id="current-date"></h2>

<ul>
<li>📆 <strong>Event:</strong> <span id="daily-event"></span></li>
<li>🕯️ <strong>Feast:</strong> <span id="feast-day"></span></li>
<li>📝 <strong>Quote:</strong> [forthcoming]</li>
<li>📻 <strong>Song:</strong> [forthcoming]</li>
</ul>

<h2>Quotidie</h2>
<ul id="quotidie-list">
</ul>

<script type="application/json" id="dailyEvents">
{{ site.data.daily_events | jsonify }}
</script>

<script type="application/json" id="feastDays">
{{ site.data.feast_days | jsonify }}
</script>

<script type="application/json" id="quotidie">
{{ site.data.quotidie | jsonify }}
</script>

<script type="application/json" id="rosaryMysteries">
{{ site.data.rosary_mysteries | jsonify }}
</script>

<script type="application/json" id="currentlyReading">
{{ site.books | where: "category", "Presently Reading" | first | jsonify }}
</script>

<script src="{{ '/assets/js/today.js' | relative_url }}"></script>