---
layout: page
title: Races
permalink: /races/
description: Races, centuries, and other endurance events
---
{% assign races = site.data.races.races | sort: "date" %}

These are technically *races,* but I've more *participated* than *competed* in them in that I'm typically in no real danger of placing.

| Event | Sport | Date |
| :--- | :--- | :--- |
{% for r in races -%}
| {% if r.url %}[{{ r.event }}]({{ r.url }}){% else %}{{ r.event }}{% endif %}{% if r.note %}[^race{{ forloop.index }}]{% endif %} | {{ r.sport }} | {{ r.date | date: "%Y-%m-%d" }} |
{% endfor %}
{% for r in races %}{% if r.note %}
[^race{{ forloop.index }}]: {{ r.note }}
{% endif %}{% endfor %}
