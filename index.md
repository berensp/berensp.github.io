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

{% assign route_count = site.rides.size | plus: site.runs.size %}

<img src="/assets/images/avatar_pmb_bw.png" alt="PMB avatar b/w" style="width: 25%;">

✌ Hi, I'm [Paul Berens](/infobox/): [product-/go-to-marketer](/bio), [skier](/skiing), [investor](/invest), [parishioner](/catholic), and diaper-changer.

What I'm up to [now](/now/)adays, or more specifically, [today](/today/).

**Q:** What value may be extracted from this site? **A:** {{ total_content }} freebies 👇
- [{{ post_count }} mini-essays](/blog/) for your consideration
- [{{ book_count }} book ideas](/books/) for your next read
- [{{ prayer_count }} prayers](/prayers/) for your sanctification
- {{ route_count }} [cycling](/cycling/) + [running](/running/) routes for happy workouts
- [{{ recipe_count }} surefire kid-friendly recipes](/recipes/) for picky eaters

Get in touch via <a href="https://signal.me/#eu/ZIW9Fp74JntNZR6qR3lzP75kawn7rnT4aCdYIPAOG6eeO25MvYpC5a36bQqXv57v" target="_blank">Signal</a> and [elsewhere](/contact/).