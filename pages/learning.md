---
layout: page
title: Learning
permalink: /learning/
ogimage: ggb.jpg
---
*"For the things we have to learn before we can do them, we learn by doing them."* (—Aristotle, Nicomachean Ethics, II, 1)

My constructivist continuing education (i.e. tinkering) for present and future endeavours:

<table>
  <thead>
    <tr>
      <th style="text-align: left;">Endeavour</th>
      <th style="text-align: left;">Tag</th>
    </tr>
  </thead>
  <tbody>
    {% for item in site.data.learning.current -%}
    <tr>
      <td>{{ item.endeavour }}</td>
      <td><span class="tag tag-{{ item.color }}">{{ item.tag }}</span></td>
    </tr>
    {% endfor -%}
    <tr>
      <td colspan="2" style="background-color: var(--table-section-header-bg); text-align: center; font-style: italic; padding: 4px 8px;"><span class="small" style="color: var(--muted-color);">Upcoming</span></td>
    </tr>
    {% for item in site.data.learning.upcoming -%}
    <tr>
      <td>{{ item.endeavour }}</td>
      <td><span class="tag tag-{{ item.color }}">{{ item.tag }}</span></td>
    </tr>
    {% endfor -%}
  </tbody>
</table>