---
layout: home
---
{% assign days_since_last_post = (site.time | date: "%s") - (site.posts.first.date | date: "%s") | divided_by: 86400 %}
<img src="/assets/images/pmb.avatar.tr.png" width="25%" height="25%">

✌ Hi, I'm [Paul Berens](/infobox/). Living in [San Francisco](/sf/) and presently [nurturing data products at Varian](/bio/).

📚 Currently [reading](/books/) *{{ site.book_now_title }}* by {{ site.book_now_author }}.

- {{ site.time }}
- {{ site.posts.first.date }}

✍ Occasionally assembling some of my thoughts in [essay form](/blog/) — most recently [*{{ site.posts.first.title }}*]({{ site.posts.first.url }}), published{% if days_since_last_post < 0 %} today.{% elsif days_since_last_post == 1 %} yesterday.{% else %} {{ days_since_last_post }} days ago.{% endif %}

📬 Get in touch at hey [at] [this domain] and [elsewhere](/contact/).