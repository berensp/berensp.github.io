---
layout: page
title: Now
permalink: /now/
last_modified_at: 2024-11-27
description: What am I up to these days. 
---
<div id="postDate" data-post-date="{{ site.posts.first.date | date: '%Y-%m-%dT%H:%M:%SZ' }}"></div>
{% assign currently_reading = site.books | where: "category", "Presently Reading" | first %}

<script src="/assets/js/timediff.js"></script>
<script src="/assets/js/current-date.js"></script>

"Now" being *nowadays*, but for *right now* (i.e., <span id="current-date">Loading...</span>), that's the [today](/today/) page.

📍 Living in [San Francisco](/sf/) for some <span id="TimeinSF"></span> now.

👨‍👩‍👧‍👦 Raising some kids with my lovely wife.

💼 Helping build and grow a SaaS business / digital product portfolio (product marketing / GTM) [@VarianMedSys](https://x.com/VarianMedSys).

✍ Occasionally assembling thoughts in [mini-essay form](/blog/) — most recently [*{{ site.posts.first.title }}*]({{ site.posts.first.url }}), posted <span id="timeDifferenceInline"></span>

{% if currently_reading %}
📚 Currently [reading](/books/) *{{ currently_reading.title }}* by {{ currently_reading.author }}
{% endif %}

🚴‍♂️ [Bicycling](/cycling/) and [running](/running/)—mostly the latter—when/where I can.

🌱 Learning a little bit of front-end via Claude; kanban; Korean (한국말).

<span class="muted small">Last updated: {{ page.last_modified_at }}—except time in SF and time since last blog post which are real-time.</span>
