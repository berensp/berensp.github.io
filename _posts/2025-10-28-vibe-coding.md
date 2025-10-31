---
layout: post
title: Vibe Coding
date: 2025-10-28
author: Paul Berens
tags: ["tech"]
description: WAGMI
---
For those of you who have been with us over the years (read: Yeobo), you've seen [this site](/) become increasingly sophisticated—not through any formal training of mine, but through "vibe-coding": learning through AI-powered trial and error.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">There&#39;s a new kind of coding I call &quot;vibe coding&quot;, where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. It&#39;s possible because the LLMs (e.g. Cursor Composer w Sonnet) are getting too good. Also I just talk to Composer with SuperWhisper…</p>&mdash; Andrej Karpathy (@karpathy) <a href="https://twitter.com/karpathy/status/1886192184808149383?ref_src=twsrc%5Etfw">February 2, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Forking and Fumbling

Back in 2019 or early 2020, I forked [Dan Romero's Jekyll site](https://danromero.org) and deployed it to GitHub Pages. Jekyll was appealing because it was simple: write in Markdown, commit to GitHub, and your site updates automatically—[no servers, no databases, no complexity](/this-site).

I meant to keep things totally simple and just use it for [blogging](/posts/), and for a short while I did, but at my core I'm a [tinkerer](/learning/)—and a technophile at that—so this site ended up becoming my experimentation canvas.

### 2019-2022: The Google + Stack Overflow Era
The early days of this site were pre-LLM boom, so every problem involved Google queries which led me to Stack Overflow threads, which led me to half-solution code snippets I didn't fully understand but could adapt. Slowly but surely, I added small bits of functionality like time and date calcs, dynamic content displays, etc. Progress was slow but educational.

### 2023: The ChatGPT Experiment
After ChatGPT went public in late 2022, I tried using it for coding help. It was hit or miss, though typically more miss. In this era there was a good amount of "LLM as the confident BSer," which is amusing...for a short while. So I upgraded to "ChatGPT Plus" almost exactly two years ago (October 2023) in the hopes of some improvement, but alas, the code would look okay, but ultimately error out. I'd go back to Stack Overflow. Or just have a total dead end.

### 2024: The Claude Breakthrough
I tried Claude by Anthropic (the free version initially) and something clicked. When code failed, I'd paste the error message and Claude would often spot the issue and fix it—not all the time; but an impressive batting average. On the third or fourth time I found myself reflexively exclaiming "you got it, you genius SOB!" I canceled my ChatGPT subscription and upgraded Claude account to Pro.

## Fetching and Refreshing

I had looked into exploiting APIs a couple years ago (must've been in my ChatGPT Era), but it was too complex for this muggle. Time passed and with it step change improvements with each LLM (less context required, higher hit rates).

Recently, I thought: *hey, now that we're living in the future (here on Claude Sonnet 4.5[^1]), this is maybe the moment to give this API thing another go.* I started with **Swarm** (which you remember as Foursquare—yes, I still use as a lifelogging tool). It ended up being pretty painless: a GitHub Actions workflow that runs nightly, calls the Foursquare API to grab my latest data, saves it to a .json file in my repo, and commits the change—which triggers Jekyll to rebuild my site with the fresh data.

[^1]: Just noting this for posterity.

Integrating **Strava**, the GPS-based social network for athletes, was more complex because their API requires OAuth with refresh tokens that expire every six hours or something like that. So I had the same GitHub Actions workflow but then it needed to see if my Strava token was still valid, refresh it automatically if it's expired, and then fetch most recent data and save to a .json file, etc.

When it fired correctly and token refresh happened automagically...elation. And it left me in awe that something that used to be so inaccessible was now at my fingertips.

To illustrate what "vibe-coding" looks like in practice, here's the trickiest piece of code we built—the Strava token refresh logic:

```javascript
// Function to refresh access token
async function refreshAccessToken() {
  console.log('Refreshing access token...');
  const postData = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token'
  }).toString();
  
  const options = {
    hostname: 'www.strava.com',
    path: '/oauth/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };
  
  const response = await makeRequest(options, postData);
  
  if (response.access_token) {
    accessToken = response.access_token;
    console.log('Access token refreshed successfully');
    
    // Update GitHub secret with new access token
    try {
      execSync(`gh secret set STRAVA_ACCESS_TOKEN --body "${accessToken}"`, {
        env: { ...process.env, GH_TOKEN: process.env.GH_TOKEN }
      });
      console.log('GitHub secret updated');
    } catch (error) {
      console.warn('Warning: Could not update GitHub secret:', error.message);
    }
    
    return response.access_token;
  } else {
    throw new Error('Failed to refresh token: ' + JSON.stringify(response));
  }
}
```

Could I have written this from scratch? Negative, Ghost Rider. But can I suss out what it does:
1. Makes a POST request to Strava with the refresh token
2. Gets back a new access token
3. Updates the GitHub secret so next time it runs, it has the fresh token
4. Handles errors with grace and style

The nice part of this setup is how simple it is architecturally:
- **Jekyll data files** (`_data/*.json`) can be referenced in templates using Liquid syntax
- **GitHub Actions** can run Node.js scripts on a schedule
- **API data** gets committed to the repo, triggering automatic site rebuilds

No servers to maintain, no databases to manage, no hosting costs. Just a static site that happens to have dynamic data.

## The Upshot
- **Previously confusing territory is now fair game.** OAuth tokens, refresh tokens, authorization codes—it's a pretty arcane until I actually worked through it once. (And by "actually worked through it," of course I mean "supervising the AI that worked through it".)
- **GitHub Actions are remarkably powerful.** They're basically free scheduled tasks that can run arbitrary code. Perfect for personal projects.
- **Static sites can be a *little* dynamic.** With the right architecture, a Jekyll site can pull live data and feel almost real-time, despite being fundamentally static.
- **Check your imposter syndrome at the door.** You just need curiosity, patience, and a good AI conversation partner. Because you're good enough, smart enough, and gosh darnit, people like you.

For my web savvy friends, I do realize this is not a technical marvel. I'm basically a three-year-old who's thrilled with his creation, and so you (the mom or dad) need to look past the anatomical chaos and just beam with pride.

![vibe-drawing](/assets/og/post_vibe-drawing.png)

And that's okay, because I quite like this little project that I've vibed into existence.

Excelsior,

— ᴘ. ᴍ. ʙ.