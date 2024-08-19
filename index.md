---
layout: home
---
<div id="postDate" data-post-date="{{ site.posts.first.date | date: '%Y-%m-%dT%H:%M:%SZ' }}"></div>
{% assign currently_reading = site.book | where: "category", "Presently Reading" | first %}
<a href="/prayers/"><img src="/assets/images/avatar_pmb_sketch_tr.png" alt="PMB avatar sketch" style="width: 40%;"></a>

✌ Hi, I'm [Paul Berens](/infobox/). Presently living in [San Francisco](/sf/) with my beautiful family, and [nurturing data products at Varian](/bio/).

✍ Occasionally assembling thoughts in [mini-essay form](/blog/) — most recently [*{{ site.posts.first.title }}*]({{ site.posts.first.url }}), posted <span id="timeDifferenceInline"></span>.

{% if currently_reading %}
📚 Currently [reading](/books/) *{{ currently_reading.title }}* by {{ currently_reading.author }}.
{% endif %}

📬 Get in touch via <a href="https://signal.me/#eu/ZIW9Fp74JntNZR6qR3lzP75kawn7rnT4aCdYIPAOG6eeO25MvYpC5a36bQqXv57v" target="_blank">Signal</a> and [elsewhere](/contact/).