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

{% assign total_routes = site.rides.size | plus: site.runs.size}

<img src="/assets/images/avatar_pmb_bw.png" alt="PMB avatar b/w" style="width: 25%;">

✌ Hi, I'm [Paul Berens](/infobox/): product marketer, go-to-marketer, skier, and diaper-changer.

What I'm up to [now](/now/)*adays*, or more specifically, [today](/today/).

**Q: What value can you extract from this website?** **A:** How about **{{ total_content }} freebies?**
- [{{ post_count }} half-baked mini-essays](/blog/)
- [{{ book_count }} book ideas for your next read](/books/)
- [{{ prayer_count }} English and Latin prayers](/prayers/)
- [{{ ride_count }} riding routes](/cycling/) and [{{ run_count }} running routes](/running/) for your workouts
- [{{ recipe_count }} surefire kid-friendly recipes](/recipes/)

Get in touch via <a href="https://signal.me/#eu/ZIW9Fp74JntNZR6qR3lzP75kawn7rnT4aCdYIPAOG6eeO25MvYpC5a36bQqXv57v" target="_blank">Signal</a> and [elsewhere](/contact/).