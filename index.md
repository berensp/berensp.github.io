---
layout: home
---
<script src="/assets/js/avatar-rotator.js"></script>

<a href="/prayers/"><img id="rotating-avatar" alt="PMB avatar" style="width: 160px; height: auto;"></a>

Product marketer in San Francisco by day; bedtime story reader by night.

Building [Swarma](/swarma/){:target="_blank"} and [Paul's Song of the Day bot](https://t.me/pb_song_bot){:target="_blank"}. Curating [prayers](/prayers/), [mental models](/systems/), [kid-friendly recipes](/recipes/), etc. More [projects](/projects/) →

{% capture tag_counts -%}{% for tag in site.tags %}{{ tag[1].size | prepend: "0000" | slice: -4, 4 }}:{{ tag[0] }}{% unless forloop.last %},{% endunless %}{% endfor %}{%- endcapture -%}
{%- assign top_tags = tag_counts | split: "," | sort | reverse -%}
Writing about {% for entry in top_tags limit:4 %}{% assign parts = entry | split: ":" %}{{ parts[1] }} ([{{ parts[0] | plus: 0 }}](/posts/tag/{{ parts[1] | slugify }}/)), {% endfor %}etc. All [{{ site.posts | size }} posts](/posts/) →

More [about](/about/) me, what I'm up to [now](/now/), and what's happening [today](/today/).

[Contact](/contact/) me on any of {{ site.data.contacts.size }} messengers.