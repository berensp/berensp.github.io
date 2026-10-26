---
layout: page
title: Systems
permalink: /systems/
---
My running list of {{ site.data.systems.items.size }} frameworks, mental models, heuristics, and first principles I find interesting/useful:

<p class="tag-filters">
  <button type="button" class="tag tag-filter" data-tag="" aria-pressed="true">all</button>
  {%- for tag in site.data.systems.tags %}
  <button type="button" class="tag tag-filter" data-tag="{{ tag }}" aria-pressed="false">{{ tag }}</button>
  {%- endfor %}
</p>

<table class="filterable">
  <thead>
    <tr>
      <th style="text-align: left;">System</th>
      <th style="text-align: left;">Tags</th>
    </tr>
  </thead>
  <tbody>
    {% for item in site.data.systems.items -%}
    <tr data-tags="{{ item.tags | join: ' ' }}">
      <td>
        {{ item.name | markdownify | remove: '<p>' | remove: '</p>' | strip }}
        {%- if item.post %} <a class="muted small" href="{{ item.post }}" title="See {{ item.post_title }} post">↗</a>{% endif %}
        {%- if item.note %}<br><span class="muted small">{{ item.note | markdownify | remove: '<p>' | remove: '</p>' | strip }}</span>{% endif %}
      </td>
      <td>{% for tag in item.tags %}<a class="tag" href="#{{ tag }}">{{ tag }}</a>{% endfor %}</td>
    </tr>
    {% endfor -%}
  </tbody>
</table>

<script src="/assets/js/tag-filter.js"></script>
