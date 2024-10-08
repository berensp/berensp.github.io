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
  {% if category == "Miscellany" %}
    {% assign current_date = 'now' | date: '%s' %}
    {% assign books_in_category = site.books | where: "category", category %}
    {% assign recent_books = "" | split: "" %}
    {% assign earliest_date = current_date %}
    {% for bookreview in books_in_category %}
      {% if bookreview.finish_date %}
        {% assign finish_date = bookreview.finish_date | date: '%s' %}
        {% assign days_since = current_date | minus: finish_date | divided_by: 86400 %}
        {% if days_since <= 365 %}
          {% assign recent_books = recent_books | push: bookreview %}
          {% if finish_date < earliest_date %}
            {% assign earliest_date = finish_date %}
          {% endif %}
        {% endif %}
      {% endif %}
    {% endfor %}
    {% if recent_books.size > 0 %}
      {% assign earliest_date_formatted = earliest_date | date: "%Y-%m-%d" %}
<h2>Other titles of note (since {{ earliest_date_formatted }})</h2>
<ul class="more-space">
      {% for bookreview in recent_books %}
  <li><i><a class="bookreview-link" href="{{ bookreview.url | relative_url }}">{{ bookreview.title | escape }}</a></i> by {{ bookreview.author }}</li>
      {% endfor %}
</ul>
    {% endif %}
  {% else %}
    {% assign books_in_category = site.books | where: "category", category %}
    {% if books_in_category.size > 0 %}
<h2>{{ category }}</h2>
<ul class="more-space">
      {% for bookreview in books_in_category %}
  <li><i><a class="bookreview-link" href="{{ bookreview.url | relative_url }}">{{ bookreview.title | escape }}</a></i> by {{ bookreview.author }}</li>
      {% endfor %}
</ul>
    {% endif %}
  {% endif %}
{% endfor %}