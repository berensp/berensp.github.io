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

{% raw %}
<script>
  // This will be replaced by the actual path in the Jekyll build process
  var baseurl = '{{ site.baseurl }}';
</script>
{% endraw %}

<script src="{{ site.baseurl }}/assets/js/timediff.js"></script>
<script src="{{ site.baseurl }}/assets/js/rosary-mysteries.js"></script>
