# unSAME Studio Website Structure

## Overview

This document provides a complete overview of the website's organization and file structure.

## Directory Structure

```
unsame-studio.github.io/
├── index.html              # Main homepage
├── about.html              # About page
├── games.html              # Games listing page
├── press.html              # Press & Contact page
├── seagull.html            # Gulltastrophe game page (unique design)
├── solara.html             # Solara game page (unique design)
├── music.html              # Soundtrack player page
│
├── css/                    # Stylesheets
│   ├── main.css           # Global styles, fonts, variables
│   ├── components.css     # UI components (buttons, cards, nav)
│   ├── layout.css         # Page layouts and grids
│   ├── animations.css     # Animations and transitions
│   └── page-templates.css # Template page layouts
│
├── js/                     # JavaScript files
│   ├── navigation.js      # Navigation menu functionality
│   ├── game-videos.js     # Game card video hover effects
│   └── danmaku.js         # Danmaku text animation
│
├── images/                 # Image assets
│   ├── banner/            # Game banner images
│   ├── logos/             # Game logos
│   ├── platforms/         # Social media icons
│   └── ...
│
├── videos/                 # Video assets
│   └── previews/          # Game preview videos
│
├── assets/                 # Font files and other assets
│   ├── LanaPixel.ttf      # Pixel font for Solara
│   └── FONTS_README.md    # Instructions for adding Pill Gothic
│
└── audios/                 # Audio files
```

## Page Organization

### Main Pages

#### 1. Homepage (`index.html`)
- Hero section with video background
- Featured games grid (6 games)
- About section
- Soundtrack player link
- Social media links
- Navigation bar

**CSS Used:**
- `main.css`, `components.css`, `layout.css`, `animations.css`

**JS Used:**
- `navigation.js`, `game-videos.js`, `danmaku.js`

#### 2. About Page (`about.html`)
- Page header with title
- About content
- Optional team section (commented out)
- Navigation bar

**CSS Used:**
- All core CSS + `page-templates.css`

#### 3. Games Page (`games.html`)
- Page header
- Full games grid
- Link to itch.io for more games
- Navigation bar

**CSS Used:**
- All core CSS + `page-templates.css`

#### 4. Press & Contact (`press.html`)
- Page header
- Contact information
- Social media links
- Optional press kit download (commented out)
- Navigation bar

**CSS Used:**
- All core CSS + `page-templates.css`

### Game-Specific Pages

#### 5. Seagull (`seagull.html`)
- Unique design with inline styles
- Language selector
- Custom layout

#### 6. Solara (`solara.html`)
- Unique design with inline styles
- Language selector
- Custom pixel art styling

#### 7. Music Player (`music.html`)
- Soundtrack player interface

## Navigation Structure

```
Home (index.html)
├── Games (games.html)
│   ├── Gulltastrophe (seagull.html)
│   ├── Solara (solara.html)
│   └── [Other games link to external sites]
├── About (about.html)
└── Press (press.html)
```

## CSS Organization

### Modular CSS Architecture

The CSS is organized into separate concerns:

1. **Variables & Globals** (`main.css`)
   - Design tokens (colors, spacing, fonts)
   - Reset styles
   - Typography

2. **Components** (`components.css`)
   - Self-contained UI elements
   - Reusable across pages

3. **Layout** (`layout.css`)
   - Page structure
   - Grid systems

4. **Animations** (`animations.css`)
   - Keyframe animations
   - Transition effects

5. **Templates** (`page-templates.css`)
   - Page-specific layouts
   - Optional, only loaded when needed

### Benefits
- **Maintainability**: Easy to find and update styles
- **Reusability**: Components work across all pages
- **Performance**: Load only what you need
- **Consistency**: Shared design tokens ensure uniformity

## JavaScript Organization

All JavaScript is modularized into separate files:

1. **`navigation.js`**
   - Mobile menu toggle
   - Navbar hide/show on scroll
   - Menu item click handlers

2. **`game-videos.js`**
   - Video hover effects on game cards
   - Desktop-only video playback
   - Video source validation

3. **`danmaku.js`**
   - Floating text animation (homepage)
   - Logo press interaction
   - Support messages

### Benefits
- **Separation of Concerns**: Each file has a single responsibility
- **Reusability**: Load only needed scripts per page
- **Maintainability**: Easy to debug and update
- **Performance**: No unnecessary code execution

## Brand Assets

### Fonts
- **Primary Font**: Pill Gothic (brand font)
  - Needs to be added to `/assets/` folder
  - See `assets/FONTS_README.md` for instructions

- **Pixel Font**: LanaPixel (used in Solara page)
  - Already included at `assets/LanaPixel.ttf`

### Colors (CSS Variables)
- Background: `#121212` (dark)
- Text: `#ffffff` (white)
- Accent: `#4CAF50` (green)
- Social media colors defined in `main.css`

## Adding New Content

### Adding a New Game to the Homepage

1. Open `index.html`
2. Find the `.games-container` section
3. Copy an existing game item
4. Update:
   - `href` - Link to game page
   - `images/banner/` - Background image
   - `videos/previews/` - Preview video
   - `images/logos/` - Game logo
   - Alt text and titles

### Creating a New Page

1. Copy a template (`about.html`, `games.html`, or `press.html`)
2. Update the `<title>` and page header
3. Modify content sections
4. Keep the CSS and JS links
5. Update navigation if needed

### Adding Social Media Links

1. Edit the navigation bar in HTML files
2. Add new icon SVG or image
3. Add hover color in `components.css`:
   ```css
   .nav-menu li:nth-child(X) .nav-link:hover {
     color: #yourcolor;
   }
   ```

## Deployment

This is a static site hosted on GitHub Pages:
- Repository: `unsame-studio.github.io`
- Live site: `https://unsame.fun`
- Custom domain: Configured via CNAME file

### To Deploy Changes:
1. Make your edits locally
2. Commit changes to git
3. Push to the `main` branch
4. GitHub Pages automatically deploys

## Best Practices

1. **Always use external CSS files** - Don't add inline styles to new pages
2. **Use CSS variables** - For colors, spacing, and design tokens
3. **Keep JavaScript modular** - One file per feature
4. **Optimize images** - Compress before adding to the repo
5. **Test responsiveness** - Check mobile, tablet, and desktop views
6. **Maintain consistency** - Use existing components when possible

## Future Expansion Ideas

- Blog or news section
- Individual game pages with consistent template
- Press kit download area
- Team member profiles
- Game development timeline/history
- Newsletter signup
- Game jam participation showcase

## Documentation Files

- `CSS_ORGANIZATION.md` - Detailed CSS structure guide
- `assets/FONTS_README.md` - Font installation instructions
- `WEBSITE_STRUCTURE.md` - This file

## Support & Questions

For questions about the website structure:
- Check the documentation files
- Review existing page code as examples
- Contact: unsamestudio@gmail.com
