---
layout: home
---
<a href="/bio/">
  <img id="rotating-avatar"
       alt="PMB avatar"
       style="width: 160px; height: auto;">
</a>

Picker, grinner, lover, marketer.

Product marketer by trade, living in San Francisco with my family. I write here about faith, books, cycling, music, and whatever else earns a post.

## Pages
- [Beliefs](/beliefs/) – pending new evidence
- [Bio](/bio/) – work and background
- [Contact](/contact/) – hmu on one of {{ site.data.contacts.size }} apps
- [Now](/now/) – what I'm up to these days
- [Style](/style/) – intentional constraints
- [Today](/today/) – feast day, daily song, birthdays, and more
- [Values](/values/) – what matters

Also: [recipes](/recipes/), [prayers](/prayers/), [cycling routes](/cycling/), [running routes](/running/), [books](/books/).

## Recent Posts
<ul class="post-list">
{%- for post in site.posts limit:3 -%}
<li>
<a class="post-link" href="{{ post.url | relative_url }}">{% if post.tags contains "books" %}<em>{{ post.title | escape }}</em>{% else %}{{ post.title | escape }}{% endif %}</a>
</li>
{%- endfor -%}
<li style="list-style-type: none;"><a class="muted small" href="{{ '/posts/' | relative_url }}">View all posts →</a></li>
</ul>

<script src="/assets/js/avatar-rotator.js"></script>