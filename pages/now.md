---
layout: page
title: Now
permalink: /now/
description: What am I up to these days. 
---
<div id="postDate" data-post-date="{{ site.posts.first.date | date: '%Y-%m-%dT%H:%M:%SZ' }}"></div>
{% assign currently_reading = site.books | where: "category", "Presently Reading" | first %}

<script src="/assets/js/timediff.js"></script>
<script src="/assets/js/current-date.js"></script>

My <code>/now</code> page so I'd better keep this thing updated. "Now" is sorta *nowadays*, but if you're looking for *right now* (i.e., <span id="current-date">Loading...</span>), then that's <a href="/today"><code>/today</code></a>.

📍 Living in [San Francisco](/sf/) for the last <span id="TimeinSF"></span> now

👨‍👩‍👧‍👦 Raising some kids with my lovely wife

💼 Helping build and grow a SaaS business (product marketing / go-to-market) [@VarianMedSys](https://x.com/VarianMedSys)

✍ Occasionally assembling thoughts in [mini-essay form](/blog/) — most recently [*{{ site.posts.first.title }}*]({{ site.posts.first.url }}), posted <span id="timeDifferenceInline"></span>

{% if currently_reading %}
📚 Currently [reading](/books/) *{{ currently_reading.title }}* by {{ currently_reading.author }}
{% endif %}

🚴‍♂️ [Bicycling](/cycling/) and [running](/running/)—mostly the latter—where I can

🌱 Learning a little bit of front-end via Claude; kanban; Korean (한국말)