---
layout: home
---
<a href="/prayers/">
  <img id="rotating-avatar" 
       alt="PMB avatar" 
       style="width: 160px; height: auto;">
</a>

Picker, grinner, lover, healthcare tech product marketer.

## Pages
- [/beliefs/](/beliefs/) – until proven otherwise
- [/bio/](/bio/) – work and background
- [/contact/](/contact/) – hmu on one of {{ site.data.contacts.size }} apps
- [/now/](/now/) – what I'm up to these days
- [/today/](/today/) – what's on tap today
- [/values/](/values/) – what matters

## Recent Posts
<ul class="post-list">
    {%- for post in site.posts limit:3 -%}
    <li>
        <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
    </li>
    {%- endfor -%}
    <li style="list-style-type: none;"><a class="muted small" href="{{ '/posts/' | relative_url }}">View all posts →</a></li>
</ul>

<script src="/assets/js/avatar-rotator.js"></script>