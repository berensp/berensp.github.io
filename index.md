---
layout: home
---
{% assign start_date = site.posts.first.date | date: "%s" | plus: 0 %}
{% assign end_date = site.time | date: "%s" | plus: 0 %}
{% assign days_since_last_post = end_date | minus: start_date | divided_by: 86400.0 %}
<img src="/assets/images/pmb.avatar.tr.png" width="25%" height="25%">

✌ Hi, I'm [Paul Berens](/infobox/). Living in [San Francisco](/sf/) and presently [nurturing data products at Varian](/bio/).

📚 Currently [reading](/books/) *{{ site.book_now_title }}* by {{ site.book_now_author }}.

✍ Occasionally assembling some of my thoughts in [essay form](/blog/) — most recently [*{{ site.posts.first.title }}*]({{ site.posts.first.url }}), published {% if days_since_last_post < 0 %} just today.{% elsif days_since_last_post == 1 %} just yesterday.{% else %} a mere {{ days_since_last_post | round }} days ago.{% endif %}

📬 Get in touch at [a myriad of messengers and social platforms](/contact/).