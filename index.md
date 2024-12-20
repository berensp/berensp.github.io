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

Hi, I'm **Paul Berens** (['b&#x026A;r&#x0259;nz](/assets/audio/berens.mp3)): [product-/go-to-marketer](/bio), [learner](/learning/), [believer](/catholic), [runner](/running/), [globetrotter](/travels/), [diaper-changer](/diapering/).

**Now**: What I'm up to [now](/now/)(adays), or more specifically, [today](/today/).

**Beliefs** (strong opinions, loosely held): You can't get smarter without reading. Technology is super—I'm an enthusiast—but it ain't gonna save us. History helps us realize how easy we've got it. *Silentium universi* (sorry, Fermi). 

**Values** that I prize—even when I fail to uphold myself: [Candor](http://sl4.org/crocker.html), creativity, curiosity, excellence, forgiveness, friendship, humour, inclusion, integrity, knowledge, love, resourcefulness, tradition, wisdom.

**{{ total_content }} freebies on this website**: [{{ post_count }} mini-essays](/blog/), [{{ book_count }} book ideas](/books/), [{{ prayer_count }} English and Latin prayers](/prayers/), {{ route_count }} [cycling](/cycling/) and [running](/running/) routes, and [{{ recipe_count }} surefire kid-friendly recipes](/recipes/).

**Get in touch**: via <a href="https://signal.me/#eu/1t-AfWH8-_l0DAyo_CgPnG4GXDq4hRC6PMLFQ8aoltnPQCCo1ExANrNSmN156kSe" target="_blank">Signal</a> and [elsewhere](/contact/).