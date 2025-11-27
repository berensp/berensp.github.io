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
- [/beliefs/](/beliefs/) – sanctam Ecclésiam cathólicam, etc.
- [/bio/](/bio/) – work and background
- [/contact/](/contact/) – reachable by {{ site.data.contacts.size }} apps
- [/now/](/now/) – what I'm up to these days
- [/today/](/today/) – what's happening today
- [/values/](/values/) – truth over comfort, etc.

## Recent Posts
<ul class="post-list">
    {%- for post in site.posts limit:5 -%}
    <li>
        <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
    </li>
    {%- endfor -%}
    <li style="list-style-type: none;"><a href="{{ '/posts/' | relative_url }}">View all posts →</a></li>
</ul>

<script src="/assets/js/avatar-rotator.js"></script>