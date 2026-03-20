---
layout: home
---
<img src="/assets/images/avatars/pmb.nakamigo.png" alt="nakamigo" style="width: 120px; height: auto;">

Product marketer in San Francisco by day; bedtime story reader by night.

More [about me](/about/), what I'm up to [now](/now/), and what's happening [today](/today/).

I write about [books](/posts/tag/books/), [theology](/posts/tag/theology/), [tech](/posts/tag/tech/), [culture](/posts/tag/culture/), etc.; most recently:

<ul class="post-list">
{%- for post in site.posts limit:3 -%}
<li>
<a class="post-link" href="{{ post.url | relative_url }}">{% if post.tags contains "books" %}<em>{{ post.title | escape }}</em>{% else %}{{ post.title | escape }}{% endif %}</a>
</li>
{%- endfor -%}
<li style="list-style-type: none;"><a class="muted small" href="{{ '/posts/' | relative_url }}">all {{ site.posts | size }} posts →</a></li>
</ul>

Get in touch on [any of {{ site.data.contacts.size }} messengers](/contact/)