---
layout: page
title: Quotidie
permalink: /quotidie/
---
{% assign currently_reading = site.books | where: "category", "Presently Reading" | first %}
<ul style="list-style:none">
  <li><input type="checkbox"/>🙏 <a href="/prayers/orate-ante-labori/">Orate Ante Labori</a> (0:01)</li>
  <li><input type="checkbox"/>⏲ deep work (1:30)</li>
  <li><input type="checkbox"/>📋 thing #1: <input type="text" id="taskInput" name="task"></li>
  <li><input type="checkbox"/>📋 thing #2: <input type="text" id="taskInput" name="task"></li>
  <li><input type="checkbox"/>📋 thing #3: <input type="text" id="taskInput" name="task"></li>
  <li><input type="checkbox"/>🇰🇷 study Korean (0:15)</li>
  <li><input type="checkbox"/>💪 pushups (30x)</li>
  <li><input type="checkbox"/>📖 read <a href="{{ currently_reading.url | relative_url }}"><i>{{ currently_reading.title }}</i></a> (0:30)</li>
  <li><input type="checkbox"/>📿 <a href="/prayers/rosary">rosary</a> (0:15)</li>
  <li><input type="checkbox"/>😴 sleep (8:00)</li>
</ul>