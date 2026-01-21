# berens.co Release Notes

Customer-facing release notes for berens.co

---

## January 2026 - Dark Mode & Visual Refinements

### Dark Mode Support (January 19-20, 2026)
- **System-Preference Based Dark Mode**: The site now automatically detects and respects your system's dark mode preference
- **Comprehensive Styling**: All pages, tables, input fields, and interactive elements now support dark mode
- **Dynamic Color Palette**: Carefully tuned dark mode colors for optimal readability
- **Visual Indicator**: The [Colophon](/colophon/) page now shows which color scheme you're viewing
- **Seamless Switching**: The site instantly adapts when you change your system preferences

### Today Page Enhancements (January 2026)
- **Refined Table Design**: Cleaner borders and improved visual hierarchy for daily schedule
- **Current Time Highlighting**: Active time slot now features a subtle left accent border for better at-a-glance visibility
- **Dark Mode Optimization**: Schedule table styling optimized for both light and dark viewing

### Code Quality Improvements (January 20, 2026)
- **Codebase Cleanup**: Fixed HTML issues, removed debug code, and streamlined configuration
- **Performance Optimizations**: Improved site loading and rendering performance

---

## January 2026 - Integrations & Interactive Features

### QR Code Payment System (January 13-14, 2026)
- **Easy Payment Options**: Added QR codes for Venmo and other payment methods
- **Quick Access**: New [/pay/](/pay/) and [/qr/](/qr/) pages for easy payment sharing

### Content Additions (January 2026)
- **Recipe Collection**: Added new recipes including chili recipe (January 17)
- **Visual Updates**: New images and assets for better visual storytelling
- **Daily Updates**: Regular updates to:
  - Strava activity data (cycling and running)
  - Swarm check-in locations
  - Daily song recommendations
  - Feast days and special events

---

## January 2026 - Major Site Launch

### Comprehensive Feature Set (January 4, 2026)
This was the major launch that transformed berens.co from a simple blog into a rich personal site.

#### Dynamic Daily Content
- **[/today/](/today/) Page**: Live daily schedule that shows your current activity
  - Displays tasks by time in Pacific timezone
  - Highlights current time slot
  - Shows daily liturgical readings
  - Displays today's special events, feast days, and birthdays
  - Features daily song recommendation

#### Automated Integrations
- **Strava Integration**: Automatic updates of cycling and running activities
- **Swarm Integration**: Location check-ins updated automatically
- **Telegram Bot**: Daily song notifications and subscription management
- **Weather Integration**: Live weather data on relevant pages

#### Content Collections
- **Prayers**: Comprehensive collection of Catholic prayers with dedicated layouts
  - Daily prayers (Pater Noster, Ave Maria, Gloria Patri)
  - Devotional prayers (Rosary, Divine Mercy Chaplet)
  - Saint prayers (St. Michael, St. Joseph, St. Jude, and more)

- **Recipes**: Personal recipe collection with structured formatting
  - Burger, Pancakes, Cast Iron Steak
  - Meatloaf, Broccoli Tots, and more

- **Cycling Routes**: Documented bike rides with GPX mapping
  - Hawk Hill, Alpine Dam, Paradise Loop
  - SF to Guerneville (SF2G)
  - Pantoll, Levis

#### Interactive Features
- **Rotating Avatar**: Homepage avatar changes based on day of week
  - Different persona for each day (commuter, explorer, hiker, etc.)

- **Time Calculations**: Relative date calculations for holidays and special events
  - Easter and related liturgical dates
  - Dynamic feast day tracking

- **Map Rendering**: Interactive maps for cycling routes and running paths
  - GPX file rendering
  - Strava activity visualization

#### Data-Driven Content
- **Birthday Tracker**: Remembers important birthdays
- **Feast Days**: Catholic liturgical calendar integration
- **Daily Events**: Personal calendar and milestone tracking
- **Book Reviews**: Reading list with reviews and ratings
- **Contact Methods**: Multi-platform contact information ({{ site.data.contacts.size }} apps)

#### Pages & Navigation
- **/beliefs/** - Personal beliefs and philosophy
- **/bio/** - Professional background and work history
- **/contact/** - Ways to get in touch
- **/now/** - Current activities and focus (inspired by Derek Sivers' /now movement)
- **/today/** - Live daily schedule and activities
- **/values/** - Core values and principles
- **/prayers/** - Prayer collection
- **/recipes/** - Recipe collection
- **/posts/** - Blog posts and essays

#### Technical Infrastructure
- **GitHub Pages Hosting**: Fast, reliable static site hosting
- **Jekyll Framework**: Flexible content management
- **Automated Workflows**: GitHub Actions for data updates
- **Responsive Design**: Mobile-friendly layouts
- **Sans-serif Typography**: Clean, readable type system

---

## November 2025 - Song Bot & Telegram Integration

### Telegram Song Bot (November 21, 2025)
Built using Claude Sonnet 4.5 via "vibe coding":
- **Daily Song Delivery**: Automated Telegram bot sends curated song-of-the-day to subscribers
- **Self-Service Subscriptions**: Users can `/subscribe` and `/unsubscribe` via Telegram
- **GitHub Actions Integration**: Automated workflows manage subscriptions and send daily songs
- **366-Song Catalog**: Full year of hand-curated tracks (including leap year support)
- **Data-Driven**: Songs stored in `_data/daily_song.yml` with YouTube Music links

Read more: [Song Bot](/song-bot/)

---

## October 2025 - API Integrations & Dynamic Data

### Strava & Swarm Automation (October 28, 2025)
Major breakthrough in "vibe coding" - automated integration of live data from fitness and location services:
- **Strava API Integration**: Automatic updates of cycling and running activities
  - OAuth token refresh handling (6-hour token expiration)
  - GitHub Actions workflow runs nightly
  - Data saved to `_data/strava.json`
- **Swarm API Integration**: Automatic location check-in updates
  - Foursquare API integration
  - Lifelogging automation
  - Data saved to `_data/swarm.json`
- **Static Site, Dynamic Data**: Jekyll site pulls live data without servers or databases

Read more: [Vibe Coding](/vibe-coding/)

---

## 2024 - The Claude Breakthrough Era

### Claude AI Integration (Throughout 2024)
Switched from ChatGPT to Claude (Anthropic) with breakthrough results:
- More reliable code generation and debugging
- Better error diagnosis and fixes
- Enabled complex features that were previously impossible
- Laid foundation for all subsequent automation work

### Content Expansion (2024)
- **20 Blog Posts** - Most prolific writing year
- Topics: Catholic faith, technology, book reviews, music, liberal arts, democracy
- Notable posts:
  - [Why I Am A Catholic](/catholic/) (February 5)
  - [Farcaster](/farcaster/) (June 29) - joined decentralized social network June 2022
  - [Delighters](/delighters/) (July 29)
  - [This Is My Body](/this-is-my-body/) (September 2)
  - [Direct Democracy](/direct-democracy/) (November 5)
  - [Alice in Wonderland](/alice/) (December 29)

---

## 2023 - Experimentation & Growth

### ChatGPT Experimentation (2023)
- Upgraded to ChatGPT Plus (October 2023)
- Mixed results - code often looked good but errored out
- Led to eventual switch to Claude in 2024

### Content Creation (2023)
- **6 Blog Posts** including:
  - [Solvitur Correndo](/solvitur-currendo/) (March 14) - context-dependent memory and running
  - [Do I Want Children?](/diwc/) (August 23)
  - [Thanksgiving](/thanksgiving/) (November 24)
  - [Christmas Music](/xmas-music/) (December 16)
  - [Hills of Gold](/hills-gold/) (December 27)

---

## 2022 - Community & Exploration

### Web3 Exploration (2022)
- **Joined Farcaster** (June 21, 2022) - decentralized social network built on blockchain
- Participated in Android Alpha
- Explored NFTs, blockchain technology, and web3 concepts
- Verified web3 identity via NFT

### Content (2022)
- **6 Blog Posts** including:
  - [Skiing](/skiing/) (February 19)
  - [The Screwtape Letters](/screwtape/) (March 19)
  - [Cut Flowers](/cut-flowers/) (May 6)
  - [YouTube Music](/ytmusic/) (June 13)
  - [Fr. Michael Himes](/frhimes/) (June 20)
  - [Seven Storey Mountain](/seven-storey/) (October 26)

---

## 2021 - Launch & Foundation

### Site Launch (September 2021)
- **Mechanics Documented** (September 24): Published [how this site works](/this-site/)
- **GitHub Pages + Jekyll**: Static site generator with Markdown content
- **Clio Template**: Forked from Dan Romero's open-source template
- **Philosophy**: "Plain text is forever" and "file over app"
- **No Servers**: Free hosting via GitHub Pages, no databases, no complexity

### First Posts (2021)
- **[Editio Princeps](/editio-princeps/)** (April 23) - First post about books and *tsundoku*
- **[September 11th](/sept-11/)** (September 11)
- **[Facebook Departure](/fb/)** (September 29) - Deep-sixed Facebook and Instagram accounts

---

## 2019-2022 - The Google & Stack Overflow Era

### Initial Fork (2019-2020)
- Forked Dan Romero's Jekyll site
- Deployed to GitHub Pages
- Simple blog-focused site
- Manual coding via Google searches and Stack Overflow

### Early Features (2019-2022)
Built slowly using pre-LLM methods:
- Basic time and date calculations
- Dynamic content displays
- Simple interactive features
- Limited by manual coding constraints

---

## 2020 - Site Foundation

### Initial Setup
- Domain established: berens.co
- Web2 verification via Keybase
- Basic structure: About, Contact, Posts
- Sans-serif typography
- Responsive design
- Copyright: Anno Domini MMXX

---

## Looking Forward

The site continues to evolve with regular content updates, new features, and refinements. All updates respect user privacy and system preferences, with a focus on performance and accessibility.

---

*For technical details about the site's implementation, visit [/this-site](/this-site) or [/colophon](/colophon).*

*Anno Domini MMXX–MMXXVI. Omnia iura reservata.*
