---
layout: home
---
<a href="/bio/">
  <img id="rotating-avatar"
       alt="PMB avatar"
       style="width: 160px; height: auto;">
</a>

Technophilic marketer and product person, living in San Francisco. I write about [faith](/posts/tag/theology/), [books](/posts/tag/books/), [tech](/posts/tag/tech/), [economics](/posts/tag/economics/), [culture](/posts/tag/culture/), etc.

## Pages
- [About](/about/) – fun facts
- [Beliefs](/beliefs/) – pending new evidence
- [Bio](/bio/) – work and background
- [Contact](/contact/) – hmu on one of {{ site.data.contacts.size }} apps
- [Now](/now/) – what I'm up to these days
- [Today](/today/) – feast day, daily song, birthdays, and more
- [Values](/values/) – what matters

Also: [recipes](/recipes/), [prayers](/prayers/), [cycling routes](/cycling/), [running routes](/running/), [books](/books/), [systems](/systems/), [style](/style/).

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