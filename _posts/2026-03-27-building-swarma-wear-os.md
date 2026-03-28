---
layout: post
title: "Building Swarma: A Third-Party Swarm Check-In App for Wear OS"
date: 2026-03-27
author: Paul Berens
tags: ["tech", "product"]
description: How I built a Wear OS app to check into Foursquare/Swarm from my Pixel Watch — with an AI co-pilot, a few wrong turns, and a working OAuth flow.
---

I'm a Swarm loyalist. Been checking in since the Foursquare days. But the official Swarm app on Wear OS is either broken or deprecated, and checking in from my Pixel Watch has been impossible. So I decided to build my own.

I called it **Swarma**.

Here's how it went — soup to nuts, detours included.

---

## The Setup

I had just installed Android Studio for the first time. My previous experience with mobile development was approximately zero. I had Claude as a coding co-pilot and a vague sense of ambition.

The plan: a Wear OS app that uses your watch's GPS to find nearby Foursquare venues and lets you check in with a single tap. Simple enough in concept. Less simple in execution.

---

## Step 1: Getting the Project to Build at All

Android Studio generated a fresh "Empty Wear App" project and immediately failed to sync with a cryptic Gradle error:

```
Plugin [id: 'org.gradle.toolchains.foojay-resolver-convention', version: '1.0.0']
was not found in any of the following sources
```

The generated version (`1.0.0`) doesn't exist. Changed it to `0.8.0`. Still failed. Turns out the plugin needs the Gradle Plugin Portal, which my corporate VPN was silently blocking via SSL inspection.

**Fix:** removed the plugin entirely (it's optional) and disabled the VPN's internet security setting.

**Takeaway #1:** Corporate networks and Android development are not friends. If Gradle can't download anything, check your VPN before debugging your code.

---

## Step 2: The Wrong Template

The "Empty Wear App" template in Android Studio generates a project using **Compose Material 3** — the standard phone UI library. But Wear OS has its own UI library (`androidx.wear.compose:compose-material`) with watch-specific components like `ScalingLazyColumn`, `Chip`, and `CompactChip`. These are completely different packages.

Result: the entire `Screens.kt` file was riddled with "Unresolved reference" errors because the components didn't exist in the generated project.

**Fix:** added `androidx.wear.compose:compose-material:1.3.1` and `androidx.wear:wear-input:1.1.0` to `app/build.gradle.kts`.

**Takeaway #2:** The Wear OS template doesn't give you Wear OS UI components out of the box. You have to add them manually.

---

## Step 3: Permissions, Permissions, Permissions

The app crashed immediately on first run with:

```
uid 10009 does not have android.permission.ACCESS_FINE_LOCATION
```

Then after fixing that:

```
Permission denied (missing INTERNET permission?)
```

Both were missing from `AndroidManifest.xml`. Easy fixes once you know what you're looking for, but easy to miss when you're focused on the Kotlin code.

**Takeaway #3:** Always declare `INTERNET`, `ACCESS_FINE_LOCATION`, and `ACCESS_COARSE_LOCATION` in the manifest for a location-based app. The compiler won't remind you.

---

## Step 4: First Successful Check-In

After sorting out permissions, the app loaded, found my location, pulled nearby venues from the Foursquare v2 API, and let me check in. First successful check-in from the watch.

The UI at this point was a light gray background with the default color scheme — fine functionally, but wrong aesthetically for a Pixel Watch's OLED display.

---

## Step 5: Making It Look Right

The Pixel Watch has a round OLED screen. True black backgrounds aren't just nice — they're correct (OLED pixels are literally off when displaying black, saving battery and looking sharp against the bezel).

Applied Swarm's brand colors:
- **Tango** `#F06D1F` as the primary accent
- **Sunshade** `#FFA633` as secondary
- True black `#000000` as background

The `ScalingLazyColumn` component doesn't inherit the background color automatically, so each screen needed an explicit `Box` wrapper with `.background(Color.Black)`. A missing closing brace in one of those wrappers caused all the subsequent composable functions to become invisible to `MainActivity` — a fun hour of debugging.

**Takeaway #4:** In Jetpack Compose, a mismatched brace doesn't just cause a syntax error — it swallows entire functions into the scope above them, causing cascading "Unresolved reference" errors elsewhere.

---

## Step 6: The OAuth Problem

This is where things got interesting.

The app needed a way for users to authenticate with Foursquare. The obvious approach — OAuth in a browser — immediately ran into a hard wall: **Wear OS doesn't have a browser.** The Pixel Watch ships with no Chrome, no WebView, nothing.

Options considered:
1. Type the 48-character OAuth token manually on the watch keyboard (tried it; brutal)
2. Use Android's Remote Input relay to type on the paired phone's keyboard (tested; didn't work on our device combo)
3. Build a webpage that generates a short PIN the user types on the watch (clever but requires a server)
4. Build a companion phone app that handles OAuth and sends the token to the watch

We went with option 4.

---

## Step 7: The Companion Phone App

Added a `phone` module to the Android Studio project. The phone app is minimal by design:

1. Opens a `WebView` loading the Foursquare OAuth URL
2. Intercepts the `swarma://auth` redirect and extracts the token
3. Shows a single "Send to Watch" button
4. Uses the **Wearable Data Layer API** to send the token to the watch

The watch side runs a `WearableListenerService` that receives the token and saves it to `DataStore`.

One critical gotcha: **the Wearable Data Layer requires both apps to share the same `applicationId`**. The phone module was initially `co.berens.swarma.phone` — different from the watch app's `co.berens.swarma` — and messages were silently dropped. Changing the phone's `applicationId` to `co.berens.swarma` fixed it.

**Takeaway #5:** When using the Wearable Data Layer, phone and watch apps must have the same `applicationId`. The namespace (used for code organization) can differ, but the application ID cannot.

Another gotcha: the `TokenListenerService` was declared in `AndroidManifest.xml` but the Kotlin file was never actually created. The manifest entry caused the app to crash immediately on launch trying to instantiate a class that didn't exist. Easy to miss when you're moving fast.

---

## Step 8: Venue Filtering and UX Polish

A few quality-of-life improvements after the core flow was working:

**Radius enforcement.** The Foursquare API treats `radius` as a hint, not a hard limit — we were getting venues 8km away despite requesting 300m. Fixed by filtering client-side after the API response: any venue beyond 300m gets dropped before the list is shown.

**Venue count.** Settled on `limit = 12` and `radius = 300m` — enough to cover a city block in any direction without overwhelming a small watch screen.

**Refresh over Sign Out.** The "Sign Out" button at the bottom of the venue list was dangerous UX — one accidental tap meant typing a 48-character token again. Replaced it with a "Refresh" button that re-fetches venues based on current location. Sign out moved to a future settings screen.

**Icon.** Designed a custom app icon — Tango orange background with a white location pin — and imported it via Android Studio's Image Asset wizard, which auto-generates all required sizes.

---

## The Result

The full flow:
1. Open **Send-to-Swarma** on the phone
2. Sign in with Foursquare (standard OAuth in a WebView)
3. Tap "Send to Watch"
4. Open **Swarma** on the watch — already authenticated
5. Watch fetches location, finds nearby venues, shows a scrollable list
6. Tap a venue, confirm, checked in

One-time setup. Token lives on the watch indefinitely.

---

## What's Next

- **Play Store release** — submitted for review with a $25 Google Play developer account. A public release makes the companion phone app OAuth flow essential — no user is typing 48 characters on a watch.
- **Venue list caching** — canceling a check-in currently re-fetches from the API. Should restore the cached list instead.
- **Swipe-to-dismiss** — the Wear OS convention for going back is a right-to-left swipe. The Cancel button works but isn't idiomatic.
- **WiFi/hotspot note** — the watch is WiFi-only, so it works fine on a phone hotspot. GPS is independent of network, so venues refresh correctly as you move around. Open the app when you arrive somewhere; it fetches your current location each time.

---

## Tools Used

- Android Studio (Meerkat)
- Kotlin + Jetpack Compose for Wear OS
- Foursquare Places API v2
- Wearable Data Layer API
- Claude as co-pilot

The whole thing — from fresh Android Studio install to first successful watch check-in — took one afternoon. Most of that time was Gradle, permissions, and brace matching.

Swarm lives.
