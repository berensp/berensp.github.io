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
- [/contact/](/contact/) – {{ site.data.contacts.size }} apps to pick from
- [/now/](/now/) – what I'm up to these days
- [`/values/`](/values/) – truth over comfort, curiosity over cool, etc.

## Recent Posts

<ul class="post-list">
    {%- for post in site.posts limit:6 -%}
    <li>
        <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
    </li>
    {%- endfor -%}
</ul>

<p><a href="{{ '/posts/' | relative_url }}">View all posts →</a></p>

<!-- Rest of your homepage content -->









<script src="/assets/js/avatar-rotator.js"></script>