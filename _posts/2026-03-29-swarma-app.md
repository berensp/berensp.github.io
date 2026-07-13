---
layout: post
title: "Swarma"
date: 2026-03-29
author: Paul Berens
tags: ["tech","product"]
ogimage: swarma/pixel.app.drawer.png
description: What vibe-coding a wearable app taught me about where the hard parts have shifted.
---
I'm old school fringe consumer tech: [Path](https://en.wikipedia.org/wiki/Path_(social_network)) for social media, [Songza](https://en.wikipedia.org/wiki/Songza) for music, Foursquare—now [Swarm](https://swarmapp.com/)—for lifelogging.

I've also deepened my commitment to Google hardware over the years—first Google Home, then [Pixel phone](/phones/), now Pixel Watch.

But there's no Swarm app on Wear OS (!), which leaves the 63 of us in this cross-sectional segment with a choice: find and beg a Swarm product manager to prioritize it in the backlog, or vibe-code it.

Option B is a lot more realistic (and fun), and thus **Swarma**™ (pronounced *shawarma)* was born.

This is my third or fourth [vibe-coding](/vibe-coding.html) project with Claude as co-pilot: I've done [APIs](/now/), a [Telegram bot](/song-bot.html), [dark mode](/dark-mode.html), etc. The pattern is familiar by now: describe what I want, iterate, and ship it. But this time the *platform* was completely new to me: Android Studio, Kotlin, Jetpack Compose, Wear OS.

The core app logic came together relatively easily: hitting the Foursquare Places API, grabbing nearby venues, displaying a scrollable list, etc. Then Claude handled the Kotlin syntax, the Compose UI components, the API calls, same as it would in JavaScript or Python.

What *wasn't* interchangeable was everything around the code:

- **Environment.** Android Studio generated a project that immediately failed to build. Then a Gradle plugin version didn't exist. And my corporate VPN was silently blocking downloads via SSL inspection—🤫. Next the Wear OS template ships with the wrong UI library. And finally the app crashes on first launch for missing permissions that the compiler never warned me about. So all of the above you'd chalk up to platform faffing; not coding problems. So I just spent more cycles having Claude diagnose them, because in many cases I didn't know the right questions to ask (or the best way to ask them).
- **UX decisions.** Lo and behold, the Foursquare API treats the radius parameter as a suggestion; not a hard limit, and so venues were populating 8km away when I'd asked for 300 meters. An actual product decision: do I trust the API's venue ranking, or enforce my own filtering and sorting? I've tested various tunings and have landed at a good middle ground, methinks, but the points is that a co-pilot doesn't have all the product context to make that call.
- **OAuth on a browserless device.** The app needs Foursquare authentication, which means OAuth, which means a browser, but wait: there *is* no browser on Wear OS. I hadn't thought of how to get the token in there so my first design had a form field where I actually had to bang in the 48-character token on the watch keyboard, which is either comical or infuriating depending on how much sleep you got the night before. This led me to create a companion phone app, which would open a Chrome Custom Tab, intercept the OAuth redirect via authorization code flow, and send the token to the watch via Bluetooth. Minimal, one-time setup.[^1]

[^1]: The first version of the companion app used a WebView instead of a Chrome Custom Tab—meaning users were authenticating inside my app rather than on Foursquare's own site. A tester on the Wear OS subreddit ([u/sorross](https://www.reddit.com/user/sorross/)) flagged it immediately as a bad design (why would I feel comfortable giving a third party app full account control?). He was right, and so I took an hour and fixed it. The co-pilot had taken the path of least resistance, but a savvy human caught it. Which is another lesson here.

Vibe-coding scales to unfamiliar platforms as long as you can identify and decompose the problem. The AI handles syntax and boilerplate. So it seems the hard parts of building have shifted from the code (implementation) to everything else: environment, architecture, product judgment, platform constraints...at least where I sit here in early 2026[^2].

[^2]: I'm confident this post will age rapidly.

The whole thing—from opening Android Studio for the first time to checking into a Foursquare venue from my watch—took about an afternoon (a.k.a. naptime) to get sorted.

<p><img src="/assets/og/swarma/pixel.app.drawer.png" alt="Swarma on Pixel Watch"><span class="muted small">Swarma v1.0, now in closed testing on the Play Store.</span></p>

Swarm lives on the Pixel Watch 🤘

— ᴘ. ᴍ. ʙ.