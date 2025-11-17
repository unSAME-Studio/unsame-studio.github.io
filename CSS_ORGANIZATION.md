# CSS Organization Guide

This document explains the new CSS structure for the unSAME Studio website.

## Overview

All CSS has been extracted from inline `<style>` tags and organized into modular, reusable files in the `/css` folder. This makes it easier to maintain consistent styling across multiple pages.

## CSS File Structure

### Core Files (Required for all pages)

1. **`css/main.css`** - Foundation styles
   - CSS custom properties (variables)
   - Font definitions (Pill Gothic brand font)
   - Global resets and base styles
   - Typography
   - Footer styles
   - Color palette and design tokens

2. **`css/components.css`** - Reusable UI components
   - Navigation bar (desktop & mobile)
   - Buttons (primary, secondary, more-games-button)
   - Social media buttons
   - Game cards with hover effects
   - Soundtrack button
   - About content box

3. **`css/layout.css`** - Layout structures
   - Hero section
   - Games grid container
   - Responsive breakpoints

4. **`css/animations.css`** - Animation effects
   - Danmaku text animation
   - Keyframe definitions

### Template Files (Optional - use as needed)

5. **`css/page-templates.css`** - Page-specific layouts
   - Page headers
   - Games list page layout
   - Press/Contact page layout
   - Team section grid

## How to Use

### For the main homepage (index.html):
```html
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/animations.css">
```

### For standard pages (about, games, press):
```html
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/animations.css">
<link rel="stylesheet" href="css/page-templates.css">
```

### For unique pages (seagull.html, solara.html):
Keep their existing inline styles - they have unique designs that don't need to follow the standard template.

## CSS Variables

All colors, spacing, and design tokens are defined as CSS variables in `main.css`:

```css
/* Colors */
--color-bg-primary: #121212;
--color-bg-secondary: #1a1a1a;
--color-text-primary: #ffffff;

/* Spacing */
--spacing-sm: 15px;
--spacing-md: 20px;
--spacing-lg: 30px;

/* And many more... */
```

To change the site's color scheme, just modify these variables in one place!

## Brand Font: Pill Gothic

The CSS is configured to use Pill Gothic as the primary font. To activate it:

1. Add the font files to the `/assets` folder:
   - `PillGothic-Light.woff2` / `.woff` / `.ttf`
   - `PillGothic-Regular.woff2` / `.woff` / `.ttf`
   - `PillGothic-Bold.woff2` / `.woff` / `.ttf`

2. The font is already set up in `main.css` with `@font-face` declarations
3. See `/assets/FONTS_README.md` for detailed instructions

## Responsive Design

All CSS files include mobile-responsive styles using media queries:
- Desktop: Default styles
- Tablet: `@media (max-width: 768px)`
- Mobile: `@media (max-width: 480px)`

## Adding New Pages

When creating a new page:

1. Copy the structure from `about.html`, `games.html`, or `press.html`
2. Include the core CSS files (main, components, layout, animations)
3. Add `page-templates.css` if using standard page layouts
4. Use the existing CSS classes - no need to write new styles!

## Common CSS Classes

### Layout
- `.container` - Centered content container with max-width
- `.games-container` - Responsive grid for game cards
- `.section-title` - Large section headings

### Components
- `.btn` or `.more-games-button` - Call-to-action buttons
- `.game-item` - Game card with hover video effect
- `.social-button` - Round social media icons
- `.about-content` - Content box with gradient background
- `.navbar` - Fixed navigation bar

### Navigation
- `.nav-container` - Navigation wrapper
- `.nav-menu` - Navigation menu list
- `.nav-link` - Navigation links
- `.nav-toggle` - Mobile hamburger menu

## Tips for Customization

1. **Change colors**: Modify CSS variables in `main.css`
2. **Adjust spacing**: Update spacing variables in `main.css`
3. **Modify animations**: Edit `animations.css`
4. **Update components**: Customize `components.css`
5. **New page layouts**: Add to `page-templates.css`

## File Dependencies

```
index.html
├── css/main.css (required)
├── css/components.css (required)
├── css/layout.css (required)
└── css/animations.css (required)

about.html / games.html / press.html
├── css/main.css (required)
├── css/components.css (required)
├── css/layout.css (required)
├── css/animations.css (required)
└── css/page-templates.css (required)
```

## Legacy Files

The following CSS files in the `/css` folder are from an old template and are **NOT** currently used:
- `style.css`
- `style-*.css` (various breakpoint files)
- `skel.css`
- `font-awesome.min.css`

These can be kept for reference or deleted if you're sure they're not needed elsewhere.
