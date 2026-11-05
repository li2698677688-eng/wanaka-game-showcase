---
name: Wanaka Games Showcase
description: Reference-led monochrome chrome for playable video comparisons.
colors:
  light-background: "#fff"
  light-text: "#282828"
  light-secondary: "#5d5d5d"
  light-border: "rgba(13,13,13,.08)"
  light-hover: "#ededed"
  light-media: "#101113"
  dark-background: "#000"
  dark-text: "#dcdcdc"
  dark-secondary: "#afafaf"
  dark-border: "rgba(255,255,255,.12)"
  dark-hover: "#262626"
  dark-button-text: "#212121"
  dark-media: "#181818"
typography:
  display:
    fontFamily: '"OpenAI Sans", sans-serif'
    fontSize: "clamp(3.25rem,5.5vw,5.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.055em"
  title:
    fontFamily: '"OpenAI Sans", sans-serif'
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  introduction:
    fontFamily: '"OpenAI Sans", sans-serif'
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  body:
    fontFamily: '"OpenAI Sans", sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  label:
    fontFamily: '"OpenAI Sans", sans-serif'
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  action:
    fontFamily: '"OpenAI Sans", sans-serif'
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "22px"
    letterSpacing: "-0.01em"
rounded:
  control: "8px"
  media: "10px"
  menu: "12px"
  pill: "999px"
spacing:
  small: "8px"
  related: "12px"
  content: "16px"
  grid: "20px"
  navigation: "24px"
components:
  action-pill:
    backgroundColor: "{colors.light-text}"
    textColor: "{colors.light-background}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
    height: "40px"
  action-pill-dark:
    backgroundColor: "{colors.dark-text}"
    textColor: "{colors.dark-button-text}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
    height: "40px"
  action-pill-disabled:
    backgroundColor: "{colors.light-text}"
    textColor: "{colors.light-background}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
    height: "40px"
  theme-picker:
    backgroundColor: "{colors.light-background}"
    textColor: "{colors.light-text}"
    rounded: "{rounded.menu}"
    padding: "4px"
  video-comparison:
    backgroundColor: "{colors.light-media}"
    rounded: "{rounded.media}"
---

# Design System: Wanaka Games Showcase

## Overview

**Creative North Star: "Paired Video Showcase"**

The visual authority is the user's pinned [OpenAI Games Showcase](https://developers.openai.com/showcase/games). This record captures the implemented adaptation: quiet monochrome navigation, OpenAI Sans, generous page space, and colorful recordings as the main visual material. The selected paired composition is specified in `.impeccable/surfaces/public-index-html.md`.

The system is flat and restrained. Light and dark themes preserve the same hierarchy and dimensions; native video and theme controls carry familiar behavior. This is a native HTML/CSS/JavaScript page, with component names below serving as reuse contracts rather than framework exports.

**Key Characteristics:**
- Monochrome page chrome, with color supplied by the recordings.
- OpenAI Sans and the pinned reference typography.
- Equal media stages with fully visible source content.
- Native controls, honest unavailable states, and reversible theme selection.

## Colors

The frontmatter records the actual `public/styles.css` palette. Runtime colors belong to the root CSS custom properties and their `[data-theme="dark"]` overrides.

### Primary

- **Charcoal / Soft White Ink:** `light-text` / `dark-text` drive headings, active navigation, focus outlines, and action surfaces. `light-background` / `dark-button-text` supply their action foregrounds.

### Neutral

- **White / Black Canvas:** `light-background` / `dark-background` fill the page, sticky navigation, and theme menu.
- **Secondary Gray:** `light-secondary` / `dark-secondary` identify descriptions, labels, and link notes without fading whole controls.
- **Quiet Divider:** `light-border` / `dark-border` separate navigation, game rows, and the footer.
- **Hover Gray:** `light-hover` / `dark-hover` supply menu and navigation emphasis.
- **Dark Media Stage:** `light-media` / `dark-media` fill letterboxing. Playback error overlays use the dark stage with white text in either theme.

**The Monochrome Chrome Rule.** Keep interface surfaces and actions on the existing neutral theme roles; the supplied recordings carry the page's color.

## Typography

**Display Font:** OpenAI Sans, with sans-serif fallback.  
**Body Font:** OpenAI Sans, with sans-serif fallback.

Local WOFF2 assets supply regular (400), medium (500), and semibold (600). Font synthesis is disabled. Preserve the actual family and weight assets in `public/assets/fonts/`.

The frontmatter owns the base hierarchy. The display uses its fluid range through desktop, with an explicit (88px) size at widths of at least (1680px). At widths of at most (700px), it becomes (40px) with tracking (-0.04em). The title is (22px) from (701–900px), returning to its base size on narrow screens. Introduction text becomes (16px) at widths of at most (900px). Durations use (12px), regular weight, and tabular numerals; link notes use (13px), then (12px) at widths of at most (900px).

**The Pinned Type Rule.** Preserve OpenAI Sans and the display tracking (-0.055em) above the narrow breakpoint; typography changes require evidence from the pinned reference or a new user instruction.

## Layout

The centered shell has a maximum width (1680px) and fluid horizontal padding (`clamp(2rem,5vw,5rem)`). The sticky primary header is (64px). Anchor offsets account for it. The introduction and comparison use two equal columns with the frontmatter grid gap. Game rows are separated by a quiet divider and (32px) top padding; the row's bottom margin is (58px).

At widths of at most (900px), the introduction tightens. At widths of at most (700px), shell padding becomes (20px), the creation action stays visible, and the introduction and comparison become single columns. At narrow widths the header typography and action padding adjust to fit. Each comparison retains DOM order: original label/video/title, then Wanaka label/video/action. The stacked pair gap is (24px); game spacing becomes (36px) with (28px) separator padding. Do not reorder the action ahead of its recording.

## Elevation & Depth

No shadows are used. Sticky layers, thin dividers, neutral hover fills, and the theme menu's outlined surface provide separation. The header and focus skip link use layer levels (30) and (100), respectively. The theme menu is anchored below its trigger with an (8px) gap.

## Shapes

Media frames use the frontmatter media radius and a fixed stage proportion (16:9). Videos use `object-fit: contain`; portrait sources remain complete with letterboxing. Actions use pill corners, the theme trigger is circular (44px), and menu options use the control radius. Keep clips on the media frame rather than cropping the recording to fill it.

## Components

### Pill Action

Compact, fully opaque text and icon. Source mapping: `.pill` in `public/styles.css`; header markup in `public/index.html`; game action creation in `createVideo()` in `public/app.js`. Its height token represents the implemented minimum height. The header variant has a smaller minimum (36px) and padding (7px 16px).

Enabled hover mixes the text surface (86%) with the canvas over (150ms). Keyboard focus uses the theme ink outline (2px) with an offset (5px). No custom pressed transformation is implemented. The unavailable game variant is a genuine disabled button with a not-allowed cursor and an associated explanatory note. Its foreground and surface remain opaque.

### Theme Picker

Source mapping: native `details`/`summary`, a labeled radio `fieldset` in `public/index.html`, `.theme-picker` styles, and `public/theme.js`. Options are exactly `light`, `dark`, and `system`; option targets are at least (44px). Native radios expose selection, and visible keyboard focus is retained.

`theme.js` runs in the document head before the stylesheet. It persists the preference as `localStorage["wanaka-theme"]`, falls back to `system` for missing/invalid values or unavailable storage, writes the resolved mode to `html.dataset.theme`, and records the preference separately in `html.dataset.themePreference`. System mode follows `prefers-color-scheme` changes. Selection closes the menu and returns focus to its trigger; Escape also closes and returns focus, and an outside click closes it. Preserve these owners when changing the control.

### VideoComparison

**Purpose and variants:** one game section containing an original recording and its Wanaka recording. Native source mapping: `loadGames()` → `.game` → `.comparison`, with `createVideo(game, "original")` and `createVideo(game, "wanaka")` producing the two figures. Keep each section's `aria-labelledby` tied to its visible original-side title. No component framework, published Props API, or alternate comparison mode exists.

**Input contract:** `public/games.json` is the single game manifest. Each entry has a unique lowercase slug `id` matching `^[a-z0-9-]+$`, an English `name`, supplied-name metadata `originalName`, and `url: null` or a real complete HTTP(S) URL. `originalName` is not displayed. IDs own section anchors, title/note IDs, and the media paths `assets/videos/{id}-{original|wanaka}.mp4` and `assets/posters/{id}-{original|wanaka}.jpg`. Updating IDs therefore requires updating the paired assets. Current example:

```json
{"id":"tiny-planet","name":"Tiny Planet","originalName":"小小星球","url":null}
```

**Link variants:** null/unconfigured URL renders “Game link coming soon” and a disabled “Play game” button described by that note. A configured HTTP(S) URL renders a real anchor, a “Made with Wanaka” note, a new-tab accessible name, `target="_blank"`, and `rel="noopener noreferrer"`. Do not invent destinations or replace the unavailable state with a working-looking link.

**Media contract:** each video has native controls, muted/default-muted, loop, inline playback, `preload="none"`, a poster, and a descriptive accessible name. At (25%) intersection the source is attached lazily and muted playback is attempted unless reduced motion is requested. Falling below that threshold or hiding the document pauses playback; returning to view resumes playback. Automatic play rejection leaves native controls usable. Unmuting one recording mutes the others. Preserve independent seek/play controls; synchronization is not implemented. Metadata supplies `m:ss` duration. Decode failure shows a download fallback, and successful metadata clears it.

**Loading and recovery:** the game-list live region starts with “Loading games…”. Fetch/manifest failure replaces it with a readable message and “Try again”, which calls `loadGames()` again. Empty arrays are treated as load failure. A separate `noscript` message explains the JavaScript requirement.

**Reuse checks:** retain source order and the title/action ownership at desktop and narrow widths; preserve full recording content; check both themes, all three theme preferences, keyboard focus/menu closure, reduced motion, playback/seek/unmute, media failure, and list failure/retry. `scripts/verify.mjs` checks the three unique manifest entries, complete asset pairs, URL protocols, and serving behavior. Browser evidence is recorded in the surface brief; the documentation previews do not replace runtime checks.

## Do's and Don'ts

### Do:

- **Do** preserve OpenAI Sans, the pinned type ramp, and both neutral themes.
- **Do** keep each original before its Wanaka recording, with the title and action attached to their respective figures.
- **Do** preserve full recording content inside the 16:9 media stages.
- **Do** use the manifest, native controls, and existing theme/media state owners for future edits.
- **Do** keep supplied-media provenance embedded in shipping posters; keep local evidence outside `public/`.

### Don't:

- **Don't** replace the paired composition with the reference site's original hero.
- **Don't** invent game URLs, a component framework, or unused component families.
- **Don't** crop portrait recordings, force audible autoplay, or bypass reduced-motion handling.
- **Don't** use overall opacity to weaken enabled action text or icons.

