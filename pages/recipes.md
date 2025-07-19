---
layout: default
title: My Recipe Box
permalink: /recipes/
description: "Hey, Good Lookin'. Whatcha got cookin'?"
---

# {{ page.title }}

{%- if site.recipes.size > 0 -%}
<ul class="more-space">
  {%- for recipe in site.recipes -%}
    <li><a class="recipe-link" href="{{ recipe.url | relative_url }}">{{ recipe.title | escape }}</a></li>
  {%- endfor -%}
</ul>
{%- else -%}
<p>No recipes found!</p>
{%- endif -%}