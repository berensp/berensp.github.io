---
layout: page
title: Posts
permalink: /blog/
description: ✍
---
<main>
  
<img src="/assets/images/curricle.02.png" width="40%" height="40%">

👋 Hi, I'm Paul from Saint Paul; currently in Saint Frank. More [about me](/about/).

<hr />

  {%- if site.posts.size > 0 -%}
    <h2>{{ page.list_title | default: "Posts" }}</h2>
    <ul class="more-space">
      {%- for post in site.posts limit:10 -%}
      <li><a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></li>
      {%- endfor -%}
    </ul>
  {%- endif -%}

{%- include footer.html -%}
</main>
