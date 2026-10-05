---
name: Obsidian Protocol
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353942'
  surface-container-lowest: '#0a0e16'
  surface-container-low: '#181c24'
  surface-container: '#1c2028'
  surface-container-high: '#262a33'
  surface-container-highest: '#31353e'
  on-surface: '#dfe2ee'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dfe2ee'
  inverse-on-surface: '#2c3039'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#68dba9'
  on-tertiary: '#003825'
  tertiary-container: '#3eb686'
  on-tertiary-container: '#00422c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#0f131c'
  on-background: '#dfe2ee'
  surface-variant: '#31353e'
typography:
  display:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-base: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system merges the technical rigor of a SecOps terminal with the clarity and accessibility of an enterprise wireframe design tool. Designed for penetration testers, security architects, and technical analysts, the interface establishes a high-density, low-fatigue workspace that feels authoritative, exact, and deliberately engineered.

The design movement synthesizes **Technical Brutalism** and **Modern Utility-First Wireframing**:
- **Blueprint Precision**: Structural boundaries are explicitly defined by hairline dividers, subtle Cartesian grid lines, and crisp coordinate indicators rather than arbitrary decoration.
- **Instrumental Restraint**: Color is applied strictly for functional telemetry—status, vulnerability severities, active nodes, and data streams. Surface planes remain dark, matte, and non-distracting.
- **Developer-Ergonomic Contrast**: Terminal neon green and laser cyan provide surgical accents against ultra-deep slate backdrops, yielding zero eye-strain during extended auditing sessions.

## Colors

The palette is engineered around an ocular-ergonomic dark architecture, utilizing deep obsidian layers for baseline containment and high-wavelength emerald/cyan for critical focal points.

### Palette Architecture
- **Base Surfaces (`#0B0F17`)**: The foundational canvas plane representing zero-state depth.
- **Containers & Surfaces (`#131B2E`, `#1E293B`)**: Layered containment units providing visual grouping without heavy drop shadows.
- **Structural Dividing Lines (`#334155`, `#475569`)**: Precise borders that emulate tactical terminal splits and blueprint wireframe schematics.
- **Primary Terminal Accent (`#10B981`)**: The execution green—denotes system health, verified secure states, primary interactive triggers, and affirmative execution.
- **Secondary Cyber Accent (`#06B6D4`)**: High-visibility cyan applied to target endpoints, dynamic metrics, and auxiliary data connections.
- **Telemetry Indicators**: Auxiliary alert tokens utilize standard SecOps mapping: `#F43F5E` (Critical/Exploit), `#F59E0B` (Warning/Medium), and `#64748B` (Inactive/Muted).

## Typography

The typographic hierarchy implements a dual-typeface system designed for clarity across data-heavy operational layouts. 

- **Primary Interface (Inter)**: Handles content hierarchy, narrative context, and high-level structure. Inter provides optical balance and prevents fatigue in dense wireframe structures.
- **Technical Telemetry (JetBrains Mono)**: Reserved for hashes, IPv4/v6 addresses, hex memory offsets, code snippets, status badges, and interface micro-labels.
- **Micro-labels (`label-caps`)**: Always presented in uppercase with positive letter spacing (`0.08em`) to enforce structural telemetry tags resembling hardware or command-line labels.

## Layout & Spacing

The layout is structured around an exact **8px rhythmic baseline** with an embedded **4px micro-grid** for compact telemetry modules.

### Grid Framework
- **Desktop (≥ 1280px)**: 12-column dynamic grid with `1.5rem` (`24px`) gutters and `2.5rem` (`40px`) exterior margin. Toolbars and multi-pane terminal views snap cleanly to this baseline.
- **Tablet (768px - 1279px)**: 8-column layout with `1rem` (`16px`) gutters and `1.5rem` (`24px`) exterior margins. Secondary telemetry panels collapse to sliding drawers or stacked layouts.
- **Mobile (< 768px)**: 4-column layout with `1rem` (`16px`) margins and gutters. Sidebars collapse to full-bleed off-canvas overlays.

### Blueprint Canvas & Dot Matrix
Root backgrounds feature an optional subtle dot matrix backdrop (dots spaced at `16px` intervals using `#1E293B` at 40% opacity) or 1px hairline Cartesian axes that communicate active wireframe and architectural planning stages.

## Elevation & Depth

Depth is established through **tonal container layering** and **low-contrast wireframe outlines**, completely rejecting diffuse ambient drop-shadows.

1. **Canvas Layer (`#0B0F17`)**: Base viewport, terminal workspace root, or blueprint canvas.
2. **Surface Container Low (`#131B2E`)**: Structural sidebars, static tool trays, and navigation anchors. Outlined with `1px solid #1E293B`.
3. **Surface Container High (`#1E293B`)**: Interactive cards, active inspector panes, and table bodies. Outlined with `1px solid #334155`.
4. **Active / Floating Overlays**: Modals, popovers, and command palettes take `#131B2E` with a `1px solid #475569` perimeter and a zero-blur outer ring (`box-shadow: 0 0 0 1px #10B981` or terminal focus glows).
5. **Hairline Precision**: All borders remain strictly `1px`. Depth is communicated by surface luminance stepping, not shadow physics.

## Shapes

The interface embraces a **Soft / Technical (`1`)** corner geometry:
- Standard controls (buttons, input fields, badges, table cells) employ `0.25rem` (`4px`) radii, echoing tactical terminal hardware and precision-milled physical instruments.
- Large containers and floating dialogs use `0.5rem` (`8px`) radii to maintain unified structural containment without losing technical firmness.
- Fully rounded pill shapes are strictly prohibited except for specialized live terminal status pings (`ping` dot badges).

## Components

### Buttons & Execution Controls
- **Primary**: Solid `#10B981` background, `#0B0F17` ultra-bold label (`Inter` weight 600). Hover shifts to `#059669`. Focus emits a sharp, dual-ring outline (`0 0 0 2px #0B0F17, 0 0 0 4px #10B981`).
- **Secondary / Wireframe**: Transparent surface with a `1px solid #334155` border and `#E2E8F0` text. Hover shifts border to `#10B981` and text to `#10B981` with an interior tint of `#10B9810A`.
- **Destructive**: `#F43F5E1A` background with `1px solid #F43F5E` border and `#F43F5E` text.

### Inputs & Terminal Fields
- **Container**: `#131B2E` background with a `1px solid #334155` border, height fixed to `36px` for dense data entry. Font: `JetBrains Mono` at `13px`.
- **Focus State**: Border transitions to `#06B6D4` with a synchronized `0 0 0 1px #06B6D4` hairline glow. Caret is custom tinted `#10B981` with steady, non-distracting blink intervals.
- **Prefix / Terminal Prompt**: Pre-pended with fixed muted syntax flags (e.g., `root@secops:~#` or `$`) styled in `JetBrains Mono` `#64748B`.

### Badges & Telemetry Chips
- **Format**: Pill-rejected; strictly rectangular with `2px` corner rounding. Monospaced font (`label-caps`), letter-spaced uppercase text.
- **Status Variants**:
  - *Active / Secure*: `#10B9811A` fill, `#10B981` border, `#10B981` label.
  - *Vector / Monitoring*: `#06B6D41A` fill, `#06B6D4` border, `#06B6D4` label.
  - *Vulnerability Detected*: `#F43F5E1A` fill, `#F43F5E` border, `#F43F5E` label.

### Data Tables & Log Lists
- **Structure**: Alternating row fills are avoided in favor of crisp horizontal `1px solid #1E293B` rules.
- **Row States**: Hover triggers an instant transition to `#1E293B80` with a `2px` vertical strip indicator on the far left edge (`#10B981`).
- **Cells**: Numeric and network data (ports, protocols, timestamps) strictly align right in `JetBrains Mono`.

### Inspection Cards & Blueprint Panels
- Structural cards employ `#131B2E` with `1px solid #334155`. 
- Header bars feature technical sub-headers: coordinate tags (e.g., `SEC-NODE-04`) rendered in `#475569` font alongside the component title.

### Checkboxes & Radios
- Box dimensions: `16px x 16px` with `2px` corner radius. Border is `1px solid #475569`.
- Checked state fills with `#10B981` displaying a solid `#0B0F17` vector checkmark or terminal square point.