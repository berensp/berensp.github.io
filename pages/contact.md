---
layout: page
title: Contact
permalink: /contact/
ogimage: phone.png
description: Say hello on these apps, messengers, etc.
---
Say hello on your favorite of {{ site.data.contacts.size }} messaging apps:
{% assign footnote_counter = 1 -%}
{% for contact in site.data.contacts -%}
- **{% if contact.web3 %}<mark>{{ contact.platform }}</mark>{% else %}{{ contact.platform }}{% endif %}** (<a href="{{ contact.url }}" target="_blank"{% if contact.rel %} rel="{{ contact.rel }}"{% endif %}>{{ contact.handle }}</a>){% if contact.note %}[^{{ footnote_counter }}]{% assign footnote_counter = footnote_counter | plus: 1 %}{% endif %}
{% endfor %}
	<mark><span class="muted small" style="font-weight: bold;">web3</span></mark>

{% assign footnote_index = 1 -%}
{% for contact in site.data.contacts -%}
{% if contact.note -%}
[^{{ footnote_index }}]: {{ contact.note }}
{% assign footnote_index = footnote_index | plus: 1 -%}
{% endif -%}
{% endfor %}

## No se puede
- ~~[iMessage](/phones/)~~
- ~~[Facebook/Instagram](/fb)~~

## Miscellany
- <a href="/assets/downloads/pmb_contact.vcf">My contact card (vCard)</a>
- <a href="/qr/">QR codes</a>
- <a href="/pay/">Payment apps</a>

## Why so many apps?

![the answer](/assets/og/xkcd_chat_systems.png)
<a class="muted small" href="https://xkcd.com/1810/" target="_blank">"Chat Systems" (#1810)</a><span class="muted small"> by Randall Munroe, xkcd.com.</span>