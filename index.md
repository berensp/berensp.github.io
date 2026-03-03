---
layout: home
---
<img src="/assets/images/avatars/pmb.nakamigo.png" alt="nakamigo" style="width: 160px; height: auto;">

I'm a marketer and product person living in San Francisco. More [about me](/about/), what I'm up to [now](/now/), and what's happening [today](/today/).

This site is filled with my curations: e.g., [beliefs](/beliefs/), [books](/books/), [cycling routes](/cycling/), [prayers](/prayers/), [recipes](/recipes/), [systems](/systems/), [values](/values/).

I write about [books](/posts/tag/books/), [theology](/posts/tag/theology/), [tech](/posts/tag/tech/), [culture](/posts/tag/culture/), etc.; most recently:

<ul class="post-list">
{%- for post in site.posts limit:3 -%}
<li>
<a class="post-link" href="{{ post.url | relative_url }}">{% if post.tags contains "books" %}<em>{{ post.title | escape }}</em>{% else %}{{ post.title | escape }}{% endif %}</a>
</li>
{%- endfor -%}
<li style="list-style-type: none;"><a class="muted small" href="{{ '/posts/' | relative_url }}">View all {{ site.posts | size }} posts →</a></li>
</ul>