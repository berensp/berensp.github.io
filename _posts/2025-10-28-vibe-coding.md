---
layout: post
title: Vibe Coding
date: 2025-10-28
author: Paul Berens
tags: ["tech"]
description: WAGMI
---
I'm not a developer. But this website has become increasingly sophisticated over the last few years years—not through any formal training of mine, but through what I call *vibe-coding*: a combo of curiosity + AI trial and error.

## Fork and Fumbling

Back in 2019 or early 2020, I forked [Dan Romero's Jekyll site](https://danromero.org) and deployed it to GitHub Pages. Jekyll was appealing because it was simple: write in Markdown, commit to GitHub, and your site updates automatically. [No servers, no databases, no complexity](/this-site).

I meant to keep things simple and just use it for [blogging](/posts/), and for a while I did, but at my core I'm a [tinkerer](/learning/)—and a technophile at that—so this site ended up being my experimentation canvas.

### 2019-2022: The Google + Stack Overflow Era
But this is pre-LLM boom so every problem involved Google queries which led me to Stack Overflow threads, which led me to half-solution code snippets I didn't fully understand but could adapt. Slowly but surely, I added small bits of functionality like time and date calcs, dynamic content displays, etc. Progress was slow but educational.

### 2023: The ChatGPT Experiment
When ChatGPT launched, I tried using it for coding help. It was hit or miss...maybe more miss. And in this era there was a good amount of "LLM as the confident b.s.er" which is funny 'til it wasn't. Code would look okay, but ultimately error out. I'd go back to Stack Overflow. Or just have a total dead end.

### 2024: The Claude Breakthrough
I tried Claude (the free version initially) and something clicked. When code failed, I'd paste the error message and Claude would immediately spot the issue and fix it—not all the time; but an impressive batting average. On the third or fourth time I found myself reflexively exclaiming "you genius SOB!" I upgraded to Claude Pro. And, of course, with each model (now we're on Sonnet 4.5[^1]) there are step change improvements (less context required, higher hit rates).

[^1]: Just noting this for posterity.

## Over here integrating APIs

I had looked into integrating APIs a couple years ago (must've been in my ChatGPT Era), but it was too complex. Recently, I thought: hey, we're maybe in right time with these LLMs to give it another go. I started with my [Swarm](https://swarmapp.com/) (which you remember as Foursquare—yes, I still use as a lifelogging tool). It ended up being pretty painless: a GitHub Actions workflow that runs nightly, calls the Foursquare API to grab my latest data, saves it to a .json file in my repo, and commits the change—which triggers Jekyll to rebuild my site with the fresh data.

Integrating Strava, the GPS-based social network for athletes, was more complex because their API requires OAuth with refresh tokens that expire every six hours or something like that. So I had the same GitHub Actions workflow but then it needed to see if my Strava token was still valid, refresh it automatically if it's expired, and then fetch most recent data and save to a .json file, etc.

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

Could I have written this from scratch? *Absolutamente no*. But can I understand what it does:
1. Makes a POST request to Strava with the refresh token
2. Gets back a new access token
3. Updates the GitHub secret so next time it runs, it has the fresh token
4. Handles errors with grace and style

The nice part of this setup is how simple it is architecturally:
- **Jekyll data files** (`_data/*.json`) can be referenced in templates using Liquid syntax
- **GitHub Actions** can run Node.js scripts on a schedule
- **API data** gets committed to the repo, triggering automatic site rebuilds

No servers to maintain, no databases to manage, no hosting costs. Just a static site that happens to have dynamic data.

## Learnings
- **Territory that used to seem confusing is now not off the table.** OAuth tokens, refresh tokens, authorization codes—it all felt arcane until I actually worked through it once. And by "actually worked through it" I mean the 
- **GitHub Actions are remarkably powerful.** They're basically free scheduled tasks that can run arbitrary code. Perfect for personal projects.
- **Static sites can be surprisingly dynamic.** With the right architecture, a Jekyll site can pull live data and feel almost real-time, despite being fundamentally static.
- **You don't need to be a developer.** You just need curiosity, patience, and a good AI conversation partner. Because you're good enough, smart enough, and gosh darnit, people like you.

For my web savvy friends, I know this is not a technical marvel...it's like your three-year-old showing you her drawing, which makes you beam with pride, but it's like: you know, this is not good by objective standards.

![vibe-drawing](/assets/og/post_vibe-drawing.png)

But it's mine, and I built it mostly vibing with Claude. (And if you're a nerd and curious about the implementation The code is all public on [GitHub](https://github.com/berensp/berensp.github.io).)

— ᴘ. ᴍ. ʙ.