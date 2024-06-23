---
layout: home
---
<div id="postDate" data-post-date="{{ site.posts.first.date | date: '%Y-%m-%dT%H:%M:%SZ' }}"></div>
{% assign currently_reading = site.bookreviews | where: "category", "Presently Reading" | first %}
<a href="/prayers/"><img src="/assets/images/pmb.avatar.tr.png" alt="PMB avatar" style="width: 25%;"></a>

✌ Hi, I'm [Paul Berens](/infobox/).

📍 Living in [San Francisco](/sf/) with my beautiful family.

💼 Presently [nurturing data products at Varian](/bio/).

✍ Occasionally assembling thoughts in [mini-essay form](/blog/) — most recently [*{{ site.posts.first.title }}*]({{ site.posts.first.url }}), posted <span id="timeDifferenceInline"></span>.

{% if currently_reading %}
📚 Currently [reading](/books/) *{{ currently_reading.title }}* by {{ currently_reading.author }}.
{% endif %}

📬 Chatting on a [myriad of messengers](/contact/).