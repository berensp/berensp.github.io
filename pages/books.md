---
layout: page
title: Books
permalink: /books/
ogimage: bookshelf.bw.png
---
<p><i>"Gutta cavat lapidem non bis, sed saepe cadendo; sic homo fit sapiens non bis, sed saepe legendo."</i> (—Giordano Bruno)</p>
<p><img src="/assets/og/bookshelf.bw.png" alt="bookshelf" width="70%" height="70%"></p>

{% assign categories = "Last Read,Presently Reading,On Deck,Near Term,Favourites,Miscellany,Books by Family/Friends" | split: "," %}

{% for category in categories %}
  {% assign books_in_category = site.data.books | where: "category", category %}
  {% if books_in_category.size > 0 %}
<h2>{{ category }}</h2>
<ul class="more-space">
    {% for book in books_in_category %}
  <li>
    {% if book.review_slug %}
      <i><a href="{{ site.baseurl }}/{{ book.review_slug }}">{{ book.title | escape }}</a></i>
    {% else %}
      <i>{{ book.title | escape }}</i>
    {% endif %}
  </li>
    {% endfor %}
</ul>
  {% endif %}
{% endfor %}