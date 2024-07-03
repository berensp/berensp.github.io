---
layout: page
title: Books
permalink: /books/
ogimage: bookshelf.bw.png
---
<p><i>"Gutta cavat lapidem non bis, sed saepe cadendo; sic homo fit sapiens non bis, sed saepe legendo."</i> (—Giordano Bruno)</p>

<p><img src="/assets/og/bookshelf.bw.png" alt="bookshelf" width="70%" height="70%"></p>

{% assign categories = "Just Finished,Presently Reading,On Deck,Near Term,Favourites,Miscellany,Books by Family/Friends" | split: "," %}

{% for category in categories %}
<h2>{{ category }}</h2>
<ul class="more-space">
{% if category == "Miscellany" %}
  {% assign current_date = 'now' | date: '%s' %}
  {% for bookreview in site.book %}
    {% if bookreview.category == "Miscellany" and bookreview.finish_date %}
      {% assign finish_date = bookreview.finish_date | date: '%s' %}
      {% assign days_since = current_date | minus: finish_date | divided_by: 86400 %}
      {% if days_since <= 365 %}
  <li><i><a class="bookreview-link" href="{{ bookreview.url | relative_url }}">{{ bookreview.title | escape }}</a></i> by {{ bookreview.author }}</li>
      {% endif %}
    {% endif %}
  {% endfor %}
{% else %}
  {% assign books_in_category = site.book | where: "category", category %}
  {% for bookreview in books_in_category %}
  <li><i><a class="bookreview-link" href="{{ bookreview.url | relative_url }}">{{ bookreview.title | escape }}</a></i> by {{ bookreview.author }}</li>
  {% endfor %}
{% endif %}
</ul>
{% endfor %}