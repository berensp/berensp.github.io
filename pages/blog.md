---
layout: page
title: Posts
permalink: /blog/
description: ✍
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
        <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
    </li>
    {%- endfor -%}
</ul>

<div id="mc_embed_signup">
    <form action="https://berens.us17.list-manage.com/subscribe/post?u=488257f22066b5de5ab8818a3&amp;id=feebd26a5e&amp;f_id=000b15e1f0" 
          method="post" 
          id="mc-embedded-subscribe-form" 
          name="mc-embedded-subscribe-form" 
          class="validate" 
          target="_self" 
          novalidate="">
        <div id="mc_embed_signup_scroll" style="display: flex; align-items: center;">
            <div class="mc-field-group" style="margin-right: 10px; flex-grow: 0;">
                <input type="email" 
                       name="EMAIL" 
                       class="required email" 
                       id="mce-EMAIL" 
                       required="" 
                       value="" 
                       placeholder="Get these posts in your inbox" 
                       style="
                           width: 250px; 
                           min-width: 120px; 
                           max-width: 100%;
                           padding: 0.5rem;
                           font-size: 1em;
                           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
                           border: 1px solid #ccc;
                           border-radius: 4px;
                       ">
            </div>
            <div aria-hidden="true" style="position: absolute; left: -5000px;">
                <input type="text" 
                       name="b_488257f22066b5de5ab8818a3_feebd26a5e" 
                       tabindex="-1" 
                       value="">
            </div>
            <div class="clear foot">
                <input type="submit" 
                       name="subscribe" 
                       id="mc-embedded-subscribe" 
                       class="button" 
                       value="Subscribe" 
                       style="
                           font-size: 1em;
                           padding: 0.75rem 1.5rem;
                           background-color: #007bff;
                           color: white;
                           border: none;
                           border-radius: 4px;
                           cursor: pointer;
                       ">
            </div>
        </div>
    </form>
</div>