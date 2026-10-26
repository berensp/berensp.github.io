---
layout: page
title: Projects
permalink: /projects/
ogimage: ggb.jpg
description: Mens et manus
---
*"For the things we have to learn before we can do them, we learn by doing them."* (—Aristotle, Nicomachean Ethics, II, 1)

What I'm working on—building, collecting, and (constructively) tinkering with:

{% assign colors = "build:turquoise,collection:yellow,invest:gray,practice:lilac" | split: "," -%}
{% assign sections = "active:Active,ongoing:Ongoing,next:Next" | split: "," -%}
{% for section in sections -%}
{% assign s = section | split: ":" -%}
{% assign items = site.data.projects | where: "status", s[0] -%}
<h2>{{ s[1] }}</h2>
<ul class="project-list">
  {%- for item in items %}
  {%- assign color = "gray" -%}
  {%- for c in colors %}{% assign kc = c | split: ":" %}{% if kc[0] == item.kind %}{% assign color = kc[1] %}{% endif %}{% endfor %}
  {%- capture metric %}{% include project_metric.html project=item %}{% endcapture %}
  <li>
    {% if item.url %}<a href="{{ item.url }}">{{ item.name }}</a>{% else %}{{ item.name }}{% endif %}
    <span class="tag tag-{{ color }}">{{ item.kind }}</span>
    {%- if item.blurb %}<br><span class="small">{{ item.blurb }}</span>{% endif %}
    {%- assign metric = metric | strip %}{% if metric != "" %}<span class="muted small"> · {{ metric }}</span>{% endif %}
  </li>
  {%- endfor %}
</ul>
{% endfor %}
