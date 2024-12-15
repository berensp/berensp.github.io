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

✌ Hi, I'm Paul Berens (['b&#x026A;r&#x0259;nz](/assets/audio/berens.mp3)): [product-/go-to-marketer](/bio), [learner](/learning/), [worshiper](/catholic), [traveler](/travels/), [skier](/skiing), [diaper-changer](/diapering/).

What I'm up to [now](/now/)adays, or more specifically, [today](/today/).

**Q:** What value may be extracted from this site? **A:** {{ total_content }} freebies 👇
- [{{ post_count }} mini-essays](/blog/) for rumination
- [{{ book_count }} book ideas](/books/) for consideration
- [{{ prayer_count }} prayers](/prayers/) for sanctification
- {{ route_count }} [cycling](/cycling/) + [running](/running/) routes for motivation
- [{{ recipe_count }} surefire kid-friendly recipes](/recipes/) for *their* satiation

Get in touch via <a href="https://signal.me/#eu/1t-AfWH8-_l0DAyo_CgPnG4GXDq4hRC6PMLFQ8aoltnPQCCo1ExANrNSmN156kSe" target="_blank">Signal</a> and [elsewhere](/contact/).