---
layout: home
---
<a href="/prayers/">
  <img id="rotating-avatar" 
       alt="PMB avatar" 
       style="width: 160px; height: auto;">
</a>

I'm a marketer and product person living in San Francisco. I write about [books](/posts/tag/books/), [theology](/posts/tag/theology/), [tech](/posts/tag/tech/), [culture](/posts/tag/culture/), etc.
Picker, grinner, lover, marketer.

## Pages
- [/about/](/about/) – fun facts
- [/bio/](/bio/) – work and background
- [/contact/](/contact/) – hmu on one of {{ site.data.contacts.size }} apps
- [/now/](/now/) – what I'm up to these days
- [/style/](/style/) – intentional constraints
- [/today/](/today/) – daily song, agenda, etc.

Also: [beliefs](/beliefs/), [books](/books/), [cycling routes](/cycling/), [prayers](/prayers/), [recipes](/recipes/), [/systems/](/systems/), [/values/](/values/).

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