---
layout: page
title: Posts
permalink: /posts/
description: Lots to discuss
ogimage: mjb_pencil_20250222.png
---
<img src="/assets/og/mjb_pencil_20250222.png" alt="Pencil, by MJB, 2025-02-22" style="width: 50%;">

{% comment %}
This will clear any content that might be pulled in from elsewhere
{% endcomment %}
{% assign content = "" %}

<ul class="post-list">
    {%- for post in site.posts -%}
    <li>
        <a class="post-link" href="{{ post.url | relative_url }}">{% if post.tags contains "books" %}<em>{{ post.title | escape }}</em>{% else %}{{ post.title | escape }}{% endif %}</a>
    </li>
    {%- endfor -%}
</ul>

<span class="muted small"><em>Italicized titles</em> = book musings</span>

<div style="margin-top: 2rem;">
    <a href="https://t.me/pb_blog_bot" 
       target="_blank" 
       style="
           display: inline-block;
           font-size: 1em;
           padding: 0.75rem 1.5rem;
           background-color: #007bff;
           color: white;
           border-radius: 4px;
           text-decoration: none;
       ">Subscribe on Telegram</a>
    <p><span class="muted small">New posts, delivered by bot as they're published. Send /subscribe and you're in; /unsubscribe and you're out. No email, no spam.</span></p>
</div>