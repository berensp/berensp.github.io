---
layout: page
title: Now
permalink: /now/
last_modified_at: 2025-01-07
description: What I'm up to these days.
---
<div id="postDate" data-post-date="{{ site.posts.first.date | date: '%Y-%m-%dT%H:%M:%SZ' }}"></div>
{% assign currently_reading = site.books | where: "category", "Presently Reading" | first %}

<script src="/assets/js/timediff.js"></script>
<script src="/assets/js/current-date.js"></script>

"Now" being *nowadays*; for *right now* (i.e., <span id="current-date">Loading...</span>), skip ahead to [today](/today/).

- Living in [San Francisco](/sf/) for some <span id="TimeinSF"></span> now with my beautiful family
- Helping build and grow a SaaS business / digital product portfolio (product marketing / GTM) [@VarianMedSys](https://x.com/VarianMedSys) ([Bio](/bio/))
- Occasionally assembling thoughts in [mini-essay form](/blog/) — most recently [*{{ site.posts.first.title }}*]({{ site.posts.first.url }}), posted <span id="timeDifferenceInline"></span>
- Currently [reading](/books/) *{{ currently_reading.title }}* by {{ currently_reading.author }}
- [Learning](/learning/) a little bit of front-end via Claude; kanban; Korean (한국말)
- [Bicycling](/cycling/) and [running](/running/)—mostly the latter—when/where I can

<span class="muted small">Last updated: {{ page.last_modified_at }}—except ${time in SF} and ${time since last blog post} which are real-time calcs; and ${current book title} which is pulling from a <a class="muted small" href="https://jekyllrb.com/docs/collections/" target="_blank">collection</a></span>.