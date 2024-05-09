---
layout: home
---
<div id="postDate" data-post-date="{{ site.posts.first.date | date: '%Y-%m-%dT%H:%M:%SZ' }}"></div>
{% assign currently_reading = site.bookreviews | where: "category", "Presently Reading" | first %}
<img src="/assets/images/pmb.avatar.tr.png" alt="PMB avatar" style="width: 25%;">

✌ Hi, I'm [Paul Berens](/infobox/). Living in [San Francisco](/sf/) and presently [nurturing data products at Varian](/bio/).
{% if currently_reading %}
📚 Currently [reading](/books/) *{{ currently_reading.title }}* by {{ currently_reading.author }}.
{% endif %}
✍ Occasionally assembling thoughts in [mini-essay form](/blog/) — most recently [*{{ site.posts.first.title }}*]({{ site.posts.first.url }}), posted <span id="timeDifferenceInline"></span>.

📬 Get in touch via a [myriad of messengers](/contact/).