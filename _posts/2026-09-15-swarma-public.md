---
layout: post
title: "Swarma, Pt. 2"
date: 2026-09-15
author: Paul Berens
tags: ["tech","product"]
ogimage: swarma/swarma_og.png
description: "What it actually took to turn a personal afternoon project into a public Wear OS app: testers, rejections, and an OAuth flow I rebuilt twice."
---
[In our last episode](/swarma-app.html), Dear Reader, I described my vibe-coding adventures that yielded a Wear OS Swarm client that I sideloaded it onto my own Pixel Watch, and it bloody worked! I built Swarma because I wanted it, and thought it'd be fun to try my hand at Wear OS / Kotlin.

But since there was no native Wear OS Swarm client, I suspected I wasn't the only one who'd be interested in this, so I went looking for testers in a couple of corners of Reddit (`r/WearOS/`, `r/SwarmApp/`, `r/Foursquare/`), and lo and behold, some interest emerged from fellow Swarm nerds...internationally, in fact: Australia, Deutschland, Greece, Nederland, España, et al. That was all the confirmation I needed to turn this from a personal, sideloaded tool into something worth perfecting (i.e., get to an official public listing).

## The testers found the real bugs

A few examples, because credit is owed:
- **u/sorross** flagged, almost immediately, that my first OAuth implementation used an in-app WebView instead of a proper browser tab, meaning users were typing their Foursquare password into *my* UI rather than Foursquare's own site...which is a security issue, and he was right to call it out. Not a huge lift to move to a Chrome Custom Tab.
- **u/c99koder** found and used the sticker feature harder than anyone, including me—actually, he's the reason stickers exist at all in a meaningful way, and his bug reports (a gym sticker mysteriously vanishing from the picker) led to a whole rethink of how used-but-still-desirable stickers should be displayed.
- Other testers pushed back on UX decisions I'd made without enough evidence: e.g., a home screen that buried the actual venue list under a button press (an extra unnecessary click).

Practically none of these were things an AI co-pilot could have caught on its own, and *a fortiori* for me: I could only catch things I saw. For example, one user saw that sticker grid was left justified and running off the screen, but that's because he had a larger screen (later Pixel Watch model) which displayed it that way whereas on mine you couldn't tell.

## Reverse-engineering the parts Foursquare didn't document

The public Foursquare API (v2) is old, largely frozen, and it does more than its documentation admits. While building sticker support, I found that `checkins/add` quietly accepts a `stickerId` parameter that isn't documented anywhere. And it works, amazingly. It applies weekly account-level bonuses correctly. What it *doesn't* do is replicate the live, venue-specific multiplier the native Swarm app shows (the "3X right here, right now" bonuses)—that math happens behind a private endpoint I can't reach. Same for counting toward mayorships, I believe.

I originally showed the static multiplier (e.g., "2x") next to each sticker. Then a tester checked in with a sticker showing 2x in Swarma and got 3x in the native app, on the same check-in, minutes apart. I'd been showing a number that was sometimes just wrong. The fix wasn't to reverse-engineer Foursquare's private multiplier logic — it was to stop promising a number I couldn't guarantee, and show a plain "this sticker has *a* bonus" glyph instead. Sometimes the right technical decision is to say less.

## The Play Store reviews your app *and* your process

Getting from "works on my watch" to "listed for the public" meant learning the rules of Google Play Store:
- **Closed testing is a gate, not a suggestion.** New developer accounts need 12 opted-in testers, continuously, for 14 days, before Google will even look at a production application. If you lose a tester and go below 12 the clock resets; which happened to me, twice. So overrecruit your testers so you've got a little buffer.
- **My first production application was rejected** for weak tester engagement (installs without usage) and a missing set of phone screenshots (I'd only submitted watch screenshots, because in my head this was a watch app).
- **My watch and phone builds needed independent version-code bands**, not sequential numbers a step apart, so I could update one without forcing a rebuild of the other. I learned this by hitting the wrong error message enough times.
- **A Wear-specific quality bar exists and is enforced separately** from general Play policy. My "Checked in!" confirmation screen got flagged for missing a scroll position indicator, on a screen where the content fit without scrolling. Apparently that doesn't matter and the indicator has to be there regardless, so that was a cycle.

So not coding problems *per se* but more learning the platform's expectations.

### Killing the phone app (a second time)

The original OAuth design—the one from the [first post](/swarma-app.html) worked, but it required a companion phone app whose only real job was opening a browser tab and shuttling a token to the watch over Bluetooth. It worked, but it was one more thing to install, one more thing to explain, and, as I mentioned, one more thing that could silently drift out of sync with the watch build.[^1]

Wear OS has a purpose-built API for exactly this (`RemoteAuthClient`) that lets a watch app kick off an OAuth flow, have it resolve in the *phone's own browser* via a system-level relay, and get the result back on the watch directly. If this could be utilized it would render the custom companion phone app unnecessary. It sounds like a small change, but it was not: it required a Google-mediated redirect URI I had to register with Foursquare, a PKCE code challenge that Google's library mandates even though Foursquare's OAuth server ignores it completely, and about a day of chasing crashes that all turned out to be the same root cause: an old, cached build quietly running on the watch while I debugged code that had already been fixed.

Once it worked, though, it was beautiful: tap "Sign In" on the watch, approve a prompt on your phone, done. The companion app is now optional.

### Where it landed

Swarma is public [on the Play Store](https://play.google.com/store/apps/details?id=co.berens.swarma) now, for Pixel Watch and Galaxy Watch. Sign-in happens entirely on the watch. Stickers show an honest bonus indicator instead of a number I couldn't back up. The venue list loads the moment you open the app, with the places you actually visit floating to the top.

None of that is a big engineering achievement in isolation. What surprised me is how little of the six months between "it works on my watch" and "it's a real listing" was spent writing new features, and how much was spent on testing infrastructure, App Store bureaucracy, and OAuth architecture (once I understood it better).

The [first post](/swarma-app.html)'s thesis was that vibe-coding shifts the hard part from implementation to everything around it: environment, product judgment, platform constraints, etc. Six months later I'd add one more item to that list: *institutional process:* test cohorts, review guidelines, version-code schemes, privacy evaluations. An AI co-pilot can write the Kotlin, but isn't at the level of lining up and managing twelve testers for fourteen consecutive days on your behalf...yet.

![Swarma landing page](/assets/og/)
<p><img src="/assets/og/swarma/swarma_og.png" alt="Swarma landing page"><span class="muted small">Swarma v1.1, now available on the Play Store.</span></p>

Swarm lives on the Pixel Watch...now worldwide.

— ᴘ. ᴍ. ʙ.

[^1]: The old design also had this thing where signing out on the phone cleared my app's own token but not Foursquare's browser session, so tapping "sign in" again silently logged you straight back into the same account. I never found a clean fix for that one as Foursquare doesn't document a logout endpoint for third-party OAuth clients.
