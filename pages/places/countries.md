---
layout: page
title: Countries visited
permalink: /countries/
---
{% assign country_count = site.data.countries.countries | where: "counts_toward_total", true | size %}
{% assign total_countries = 195 %}
{% assign percent_remaining = total_countries | minus: country_count | times: 100 | divided_by: total_countries %}
{% assign excluded_countries = site.data.countries.countries | where: "counts_toward_total", false %}

*"The world is a country which nobody ever yet knew by description; one must travel through it one's self to be acquainted with it."* (—Philip Stanhope, Earl of Chesterfield)

{{ country_count }} of {{ total_countries }} countries visited (~{{ percent_remaining }}% yet to explore)

| Order | Ctry. | First Trip |
| :----: | :----: | :--- |
{% for country in site.data.countries.countries -%}
| {{ country.order }} | {{ country.flag }}{% unless country.counts_toward_total %}[^excluded]{% endunless %} | {{ country.first_trip }} |
{% endfor %}

{% if excluded_countries.size > 0 %}
[^excluded]: {% for country in excluded_countries %}{{ country.exclusion_reason }}{% unless forloop.last %}; {% endunless %}{% endfor %}. (See footnote on [about](/about/) page for "country" definition.)
{% endif %}

(See also [States visited](/states/).)