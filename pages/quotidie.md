---
layout: page
title: Quotidie
permalink: /quotidie/
---
{% assign currently_reading = site.books | where: "category", "Presently Reading" | first %}
<ul style="list-style:none">
  <li><input type="checkbox"/>🙏 <a href="/prayers/orate-ante-labori/">Orate ante labori</a> (0:01)</li>
  <li><input type="checkbox"/>⏲ Deep work (1:30)</li>
  <li><input type="checkbox"/>📋 Thing #1: <input type="text" id="taskInput" name="task"></li>
  <li><input type="checkbox"/>📋 Thing #2: <input type="text" id="taskInput" name="task"></li>
  <li><input type="checkbox"/>📋 Thing #3: <input type="text" id="taskInput" name="task"></li>
  <li><input type="checkbox"/>🌱 Study Korean (0:15)</li>
  <li><input type="checkbox"/>💪 Pushups (30x)</li>
  <li><input type="checkbox"/>🗃️ Put things back in their places</li>
  <li><input type="checkbox"/>📖 Read <a href="{{ currently_reading.url | relative_url }}"><i>{{ currently_reading.title }}</i></a> (0:30)</li>
  <li><input type="checkbox"/>📿 <a href="/prayers/rosary">Rosary</a> (0:15)</li>
  <li><input type="checkbox"/>😴 Sleep (8:00)</li>
</ul>