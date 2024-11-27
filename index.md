---
layout: home
---
{% assign recipe_count = site.recipes | size %}
{% assign prayer_count = site.prayers | size %}
{% assign run_count = site.runs | size %}
{% assign ride_count = site.rides | size %}
{% assign book_count = site.books | size %}
{% assign post_count = site.posts | size %}

{% assign total_content = site.posts.size
    | plus: site.books.size
    | plus: site.prayers.size
    | plus: site.rides.size
    | plus: site.runs.size
    | plus: site.recipes.size %}

<img src="/assets/images/avatar_pmb_bw.png" alt="PMB avatar b/w" style="width: 25%;">

✌ Hi, I'm [Paul Berens](/infobox/): product marketer, go-to-marketer, skier, and diaper-changer.

Here's my [now](/now/) page[^1], which is up-to-date—but the up-to-the-*minute* one is the [today](/today/) page.

[^1]: Q: What's a "now" page? <a href="https://nownownow.com/about" target="_blank">Answer</a>.

What value does this website bring me? {{ total_content }} freebies:
- {{ post_count }} [scintillating mini-essays](/blog/)
- {{ book_count }} [book ideas for your next read](/books/)
- {{ prayer_count }} [English and Latin prayers](/prayers/)
- {{ ride_count }} [riding routes](/cycling/) and {{ run_count }} [running routes](/running/) for your workouts
- {{ recipe_count }} [kid-friendly recipes](/recipes/)

I enjoy [reading](/books/), [writing](/blog/) — most recently [*{{ site.posts.first.title }}*]({{ site.posts.first.url }}), posted <span id="timeDifferenceInline"></span>.

Get in touch via <a href="https://signal.me/#eu/ZIW9Fp74JntNZR6qR3lzP75kawn7rnT4aCdYIPAOG6eeO25MvYpC5a36bQqXv57v" target="_blank">Signal</a> and [elsewhere](/contact/).