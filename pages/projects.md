---
layout: page
title: Projects
permalink: /projects/
ogimage: ggb.jpg
description: Mens et manus
---
*"For the things we have to learn before we can do them, we learn by doing them."* (—Aristotle, Nicomachean Ethics, II, 1)

What I'm building, curating, investing in, and (constructively) learning:

{% assign sections = "build:Building,collection:Curating,invest:Investing,practice:Learning" | split: "," -%}
{% assign statuses = "active,ongoing,next" | split: "," -%}
{% for section in sections -%}
{% assign s = section | split: ":" -%}
<h2 id="{{ s[1] | downcase }}">{{ s[1] }}</h2>
<ul class="project-list">
  {%- for status in statuses %}
  {%- assign items = site.data.projects | where: "kind", s[0] | where: "status", status %}
  {%- for item in items %}
  {%- capture metric %}{% include project_metric.html project=item %}{% endcapture %}
  <li>
    {% if item.url %}<a href="{{ item.url }}">{{ item.name }}</a>{% else %}{{ item.name }}{% endif %}
    {%- if item.status == "next" %} <span class="tag tag-lilac">up next</span>{% endif %}
    {%- if item.blurb %}<br><span class="small">{{ item.blurb }}</span>{% endif %}
    {%- assign metric = metric | strip %}{% if metric != "" %}<span class="muted small"> · {{ metric }}</span>{% endif %}
  </li>
  {%- endfor %}
  {%- endfor %}
</ul>
{% endfor %}
