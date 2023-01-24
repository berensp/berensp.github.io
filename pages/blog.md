---
layout: default
title: Posts
permalink: /blog/
description: ✍
---
<main>

  {%- if site.posts.size > 0 -%}
    <h1>{{ page.list_title | default: "Posts" }}</h1>
    <ul class="more-space">
      {%- for post in site.posts limit:10 -%}
      <li><a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></li>
      {%- endfor -%}
    </ul>
  {%- endif -%}

{%- include footer.html -%}

</main>