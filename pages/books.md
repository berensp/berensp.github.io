---
layout: page
title: Books
permalink: /books/
ogimage: bookshelf.bw.png
---
*"Gutta cavat lapidem non bis, sed saepe cadendo; sic homo fit sapiens non bis, sed saepe legendo."*[^1] (—Giordano Bruno)

[^1]:*A drop hollows out the stone by falling not twice, but often; so too is a person becomes wise by reading not twice, but often.* I ain't particularly well-read, but changing that situation one book at a time.

<img src="/assets/og/bookshelf.bw.png" alt="bookshelf" width="70%" height="70%">

{% assign categories = "Just Finished,Presently Reading,On Deck,Near Term,Favourites,Reviews,Books by Family/Friends" | split: "," %}

{% for category in categories %}
  {% assign books_in_category = site.bookreviews | where: "category", category %}
  {% if books_in_category.size > 0 %}
    <h2>{{ category | capitalize }}</h2>
    <ul class="more-space">
      {% for bookreview in books_in_category %}
        <li><i><a class="bookreview-link" href="{{ bookreview.url | relative_url }}">{{ bookreview.title | escape }}</a></i> by {{ bookreview.author }}</li>
      {% endfor %}
    </ul>
  {% endif %}
{% endfor %}