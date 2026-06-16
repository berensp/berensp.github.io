---
layout: page
title: Races
permalink: /races/
description: Races, centuries, and other endurance events
---
{% assign races = site.data.races.races | sort: "date" %}
| Event | Sport | Date |
| :--- | :--- | :--- |
{% for r in races -%}
| {% if r.url %}[{{ r.event }}]({{ r.url }}){% else %}{{ r.event }}{% endif %}{% if r.note %}[^race{{ forloop.index }}]{% endif %} | {% case r.sport %}{% when 'Cycling' %}🚴{% when 'Running' %}🏃{% else %}🏅{% endcase %} {{ r.sport }} | {{ r.date | date: "%Y-%m-%d" }} |
{% endfor %}
{% for r in races %}{% if r.note %}
[^race{{ forloop.index }}]: {{ r.note }}
{% endif %}{% endfor %}
