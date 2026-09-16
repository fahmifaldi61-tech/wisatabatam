---
name: Wisata Batam AI
colors:
  surface: '#0c1321'
  surface-dim: '#0c1321'
  surface-bright: '#323948'
  surface-container-lowest: '#070e1b'
  surface-container-low: '#151c29'
  surface-container: '#19202d'
  surface-container-high: '#232a38'
  surface-container-highest: '#2e3543'
  on-surface: '#dce2f5'
  on-surface-variant: '#bac9cc'
  inverse-surface: '#dce2f5'
  inverse-on-surface: '#2a303f'
  outline: '#849396'
  outline-variant: '#3b494c'
  surface-tint: '#00daf3'
  primary: '#c3f5ff'
  on-primary: '#00363d'
  primary-container: '#00e5ff'
  on-primary-container: '#00626e'
  inverse-primary: '#006875'
  secondary: '#44e2cd'
  on-secondary: '#003731'
  secondary-container: '#03c6b2'
  on-secondary-container: '#004d44'
  tertiary: '#dbf0ff'
  on-tertiary: '#00354a'
  tertiary-container: '#99d9ff'
  on-tertiary-container: '#006083'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#9cf0ff'
  primary-fixed-dim: '#00daf3'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#004f58'
  secondary-fixed: '#62fae3'
  secondary-fixed-dim: '#3cddc7'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005047'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#0c1321'
  on-background: '#dce2f5'
  surface-variant: '#2e3543'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 34px
    fontWeight: '800'
    lineHeight: 42px
    letterSpacing: -0.025em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0.005em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system delivers an "Anti-Gravity Glassmorphism" experience tailored for Batam City's premier AI tourism assistant. The aesthetic merges the calm mystique of the Riau Archipelago’s deep ocean twilight with futuristic, weightless intelligence. It targets international weekend travelers, regional digital nomads, and domestic leisure seekers navigating ferry bookings, duty-free hubs, coastal resorts, and culinary gems across Batam.

Key visual pillars:
- **Weightless Glassmorphism:** Translucent floating planes layered over a deep oceanic gradient canvas, evoking marine depth and zero-gravity modernism.
- **Oceanic Luster:** High-energy cyan and seafoam teal bioluminescent accents puncture deep maritime abyssal layers, directing attention effortlessly.
- **Precision Atmosphere:** Polished frosted interfaces, hairline translucent borders, and soft directional light reflections ensure an ultra-modern travel concierge feel.
- **Accessible Contrast:** Despite heavy glass usage, all interactive layers and text tokens strictly adhere to WCAG AA/AAA standards through calculated background darkening and contrast-boosting backdrops.

## Colors

The palette simulates descending into Batam's crystal waters during maritime twilight.

### Palette Roles & Usage
- **Primary (`#00E5FF` - Radiant Cyan):** Represents the conversational intelligence and primary interactive vector. Used for primary CTAs, active AI query pulses, active tab states, and key navigational points.
- **Secondary (`#2DD4BF` - Seafoam Teal):** Reflects coastal island energy and verified travel states. Applied to recommendation chips, booking confirmations, success notifications, and price highlights.
- **Tertiary (`#38BDF8` - Sky Marine Blue):** Soft informational bridges, supporting tags, ferry route vectors, and secondary indicators.
- **Neutral Base (`#070E1B` - Abyssal Navy):** The cosmic, deep ocean bedrock. Creates infinite visual depth for floating components.

### Surface and Glass Tokens
- **Canvas Base:** Linear gradient from `#060B14` via `#0A1628` to `#040810`.
- **Glass Panel Surface (Resting):** `rgba(13, 27, 49, 0.65)` layered with `backdrop-filter: blur(20px) saturate(160%)`.
- **Glass Panel Surface (Elevated / Modal):** `rgba(18, 38, 68, 0.80)` layered with `backdrop-filter: blur(28px) saturate(180%)`.
- **Glass Hairline Border:** Linear gradient `rgba(255, 255, 255, 0.16)` along the top edge fading to `rgba(0, 229, 255, 0.08)` on the lower edge.
- **Text On Dark:** Primary text `#F0FDF4` (high legibility frost white), secondary text `#94A3B8` (cool mist slate), muted text `#64748B`.

## Typography

The type scale relies exclusively on **Plus Jakarta Sans**, chosen for its crisp geometric construction, modern international legibility, and humanist openness that feels friendly in travel dialogue.

### Scale Rules & Composition
- **Display & Large Headlines:** Used for conversational welcomes, landmark discovery intros (e.g., "Barelang Bridge at Sunset"), and itinerary titles. Keep line heights tight to maintain architectural balance on glass panels.
- **Body Text:** Ample line heights preserve effortless readability over variable blurred backgrounds and high-density travel facts (itineraries, ferry departure lists).
- **Labels & Micro-Tags:** Set with subtle positive tracking (`+0.02em` to `+0.05em`) in medium or semi-bold to withstand frosted background transitions without loss of clarity.

## Layout & Spacing

The layout is built around a dynamic fluid grid engineered to give conversational travel cards breathing room and a hovering, unconfined posture.

### Responsive Grid
- **Mobile (< 768px):** 4-column layout, `margin: 1rem` (16px), `gutter: 1.25rem` (20px). Chat interaction docks fixed at the bottom with a generous floating safe-area gap.
- **Tablet (768px - 1199px):** 8-column layout, `margin: 2rem` (32px), `gutter: 1.5rem` (24px). Split conversational stream alongside an interactive map or destination gallery.
- **Desktop (>= 1200px):** 12-column layout max-width bounded at `1360px`, `margin: 3rem` (48px), `gutter: 2rem` (32px). Itinerary drawer, central assistant thread, and right-hand telemetry/booking card.

### Anti-Gravity Spacing Philosophy
To reinforce "Anti-Gravity," nested card margins and gaps rely on generous outer cushions (`space-lg` to `space-xl`) paired with snug, structured inner component paddings (`space-md`). Elements appear to levitate independently within vertical stacks rather than clinging to hard borders.

## Elevation & Depth

Visual depth is achieved through multi-layered glass physics and bioluminescent ambient backlighting, avoiding muddy, traditional drop shadows.

### Depth Tiers
- **Layer 0 (Void Canvas):** Deep sea twilight radial gradients with subtle background noise texture and low-frequency blur orbs (`#00E5FF10` and `#2DD4BF08`).
- **Layer 1 (Recessed Glass):** Input bars, secondary pills, chat background track:
  - Fill: `rgba(10, 22, 40, 0.50)`
  - Backdrop Blur: `12px`
  - Border: `1px solid rgba(255, 255, 255, 0.06)`
- **Layer 2 (Floating Cards / Messages):** Assistant answers, itinerary blocks, hotel cards:
  - Fill: `rgba(13, 27, 49, 0.65)`
  - Backdrop Blur: `20px`
  - Border: `1px solid rgba(255, 255, 255, 0.12)` with light incident along the top border
  - Shadow: `0 12px 32px -4px rgba(2, 8, 20, 0.60), 0 0 1px 1px rgba(255, 255, 255, 0.08) inset`
- **Layer 3 (Active / Floating Modals & Toolbars):**
  - Fill: `rgba(16, 35, 63, 0.85)`
  - Backdrop Blur: `32px`
  - Glow Shadow: `0 20px 48px -8px rgba(0, 229, 255, 0.18), 0 0 24px 0 rgba(45, 212, 191, 0.12)`

## Shapes

The shape system employs pronounced curvature (equivalent to `rounded-3xl` for primary structures and pill geometries for action surfaces) to remove harsh friction and mirror the fluidity of aquatic environments.

### Curvature Tokens
- **Major Containers & Cards:** `1.5rem` (24px) to `2rem` (32px) border radius. Gives tourism destination cards and AI thought cards an organic pebble-like pebble silhouette.
- **Inputs & Modal Dialogs:** `1.5rem` (24px).
- **Buttons, Chips, and Micro Badges:** Full pill-shaped (`9999px`), ensuring tactile ergonomics for touch-based mobile itinerary planning.

## Components

### Buttons
- **Primary Action (AI Spark / Book Now):** Pill-shaped. Background of radiant cyan (`#00E5FF`) with dark maritime text (`#070E1B`), font weight `700`. Emits a soft cyan halo on hover: `box-shadow: 0 0 20px rgba(0, 229, 255, 0.45)`.
- **Glass / Secondary Action:** Pill-shaped. Semi-transparent background `rgba(255, 255, 255, 0.08)`, text `#F0FDF4`, border `1px solid rgba(255, 255, 255, 0.15)`. Hover fills to `rgba(255, 255, 255, 0.14)` with subtle teal border transition.
- **Ghost:** Text only in `#38BDF8` with zero baseline border; underlines with smooth glow animation upon cursor focus.

### Conversational Cards & Itinerary Panels
- **Assistant Response Bubbles:** Container shape set to `rounded-3xl` (`24px`). Glass fill `rgba(13, 27, 49, 0.70)` with a top edge reflection (`1px solid rgba(255, 255, 255, 0.16)`). Left-aligned with subtle seafoam teal gradient dot indicating AI active status.
- **Tourism Destination Cards:** Rich preview cards sporting edge-to-edge photography at the top with a curved internal border mask, overlaid metadata badges (e.g., "Batam Center Ferry Terminal • 12 mins"), and an interactive rate chip floating at top-right.

### Chips & Recommendation Tags
- Pill geometry with padding `space-xs` vertical and `space-md` horizontal.
- Resting state: `rgba(45, 212, 191, 0.10)` with `#2DD4BF` label and hairline border `rgba(45, 212, 191, 0.25)`.
- Hover/Active: Background shifts to `rgba(45, 212, 191, 0.25)` accompanied by a gentle bioluminescent blur.

### AI Prompt Input Field
- Suspended dock layout: A floating glass pill elevated above the bottom safe area.
- Background `rgba(10, 22, 40, 0.75)` with `backdrop-filter: blur(24px)`.
- Input font: `body-md` in `#F0FDF4` with placeholder text in `#64748B`.
- Integrated send button: High-contrast cyan circle inset within the right edge, activating dynamically when text length > 0.

### Selection Controls (Checkbox & Radio)
- Circular/Pill rounded forms. Inactive: `rgba(255, 255, 255, 0.10)` with hairline ring.
- Active: Radiant cyan fill with checkmark or dot knocked out in `#070E1B`.

### Assistant Audio / Waveform Visualizer
- Specialized component for hands-free island navigation: dynamic vertical glass bars pulsating in frequency between `#00E5FF` and `#2DD4BF`, floating within a translucent rounded-2xl capsule.