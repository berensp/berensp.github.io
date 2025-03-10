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

Hi, I'm <span class="header-text">Paul Berens</span> (['b&#x026A;r&#x0259;nz](/assets/audio/berens.mp3))<b>:</b> [product-/go-to-marketer](/bio), [learner](/learning/), [believer](/catholic), [runner](/running/), [globetrotter](/travels/), [diaper-changer](/diapering/).

<span class="header-text">Strong beliefs, loosely held:</span> [first principles](/first-principles/), [values](/values/), [pet peeves](/pet-peeves/), [resolutions](/resolutions/).

<span class="header-text">Now:</span> What I'm up to [now](/now/)(adays), or more specifically, [today](/today/).

<span class="header-text">{{ total_content }} freebies on this website:</span> [{{ post_count }} mini-essays](/posts/), [{{ book_count }} book ideas](/books/), [{{ prayer_count }} prayers](/prayers/), {{ route_count }} [cycling](/cycling/) and [running](/running/) routes, and [{{ recipe_count }} surefire kid-friendly recipes](/recipes/).

<span class="header-text">Get in touch:</span> via <a href="https://signal.me/#eu/1t-AfWH8-_l0DAyo_CgPnG4GXDq4hRC6PMLFQ8aoltnPQCCo1ExANrNSmN156kSe" target="_blank">Signal</a>, [email](/email/), and [elsewhere](/contact/).