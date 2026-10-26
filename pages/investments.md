---
layout: page
title: Investments
permalink: /investments/
description: Content from berens.co is for informational purposes only and should not be relied upon for business or investment advice. 
---
Seeking to be a no-fuss, low-burden co-investor. Contributed meager ducats to the following startups in their early rounds:
{% for co in site.data.investments.startups -%}
- <a href="{{ co.url }}" target="_blank">{{ co.name }}</a> ({% if co.via_url %}<a href="{{ co.via_url }}" target="_blank">{{ co.via }}</a>{% else %}{{ co.via }}{% endif %}) – {{ co.blurb }}
{% endfor %}
Have also made direct investments in the following funds:
{% for fund in site.data.investments.funds -%}
- {{ fund.name }} (<a href="{{ fund.via_url }}" target="_blank">{{ fund.via }}</a>)
{% endfor -%}
