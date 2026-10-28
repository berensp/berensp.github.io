---
layout: home
---
<script src="/assets/js/avatar-rotator.js"></script>

<a href="/prayers/"><img id="rotating-avatar" alt="PMB avatar" style="width: 160px; height: auto;"></a>

Telling product stories by day and bedtime stories by night.

[Building](/projects/#building) API-powered apps and bots; and [curating](/projects/#curating) mental models, prayers, recipes, etc.

{% capture tag_counts -%}{% for tag in site.tags %}{{ tag[1].size | prepend: "0000" | slice: -4, 4 }}:{{ tag[0] }}{% unless forloop.last %},{% endunless %}{% endfor %}{%- endcapture -%}
{%- assign top_tags = tag_counts | split: "," | sort | reverse -%}
[Writing](/posts/) about {% for entry in top_tags limit:4 %}{% assign parts = entry | split: ":" %}{{ parts[1] }}, {% endfor %}and more.

More [about](/about/) me, what I'm up to [now](/now/), and what's happening [today](/today/).

[Contact](/contact/) me on any of {{ site.data.contacts.size }} messengers.