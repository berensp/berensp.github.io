---
layout: page
title: Books
permalink: /books/
ogimage: bookshelf.bw.png
---
<p><i>"Gutta cavat lapidem non bis, sed saepe cadendo; sic homo fit sapiens non bis, sed saepe legendo."</i> (—Giordano Bruno)</p>

<p><img src="/assets/og/bookshelf.bw.png" alt="bookshelf" width="70%" height="70%"></p>

{% assign categories = "Just Finished,Presently Reading,On Deck,Near Term,Favourites,Miscellany,Books by Family/Friends" | split: "," %}

{% assign today = site.time | date: "%Y-%m-%d" %}
{% assign one_year_ago = today | date_modify: "-1 year" %}

{% for category in categories %}
{% assign books_in_category = site.book | where: "category", category %}
{% if category == "Miscellany" %}
    {% assign books_in_category = books_in_category | where_exp: "book", "book.finish_date and book.finish_date >= one_year_ago" %}
  {% endif %}
{% if books_in_category.size > 0 %}
<h2>{% if category == "Miscellany" %}Others (since {{ one_year_ago }}){% else %}{{ category | capitalize }}{% endif %}</h2>
<ul class="more-space">
{% for bookreview in books_in_category %}
<li><i><a class="bookreview-link" href="{{ bookreview.url | relative_url }}">{{ bookreview.title | escape }}</a></i> by {{ bookreview.author }}</li>
{% endfor %}
</ul>
{% endif %}
{% endfor %}