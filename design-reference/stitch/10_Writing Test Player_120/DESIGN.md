---
name: Academic Precision
colors:
  surface: '#f9f9ff'
  surface-dim: '#d4daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e8eeff'
  surface-container-high: '#e3e8f9'
  surface-container-highest: '#dde2f3'
  on-surface: '#161c27'
  on-surface-variant: '#444650'
  inverse-surface: '#2a303d'
  inverse-on-surface: '#ecf0ff'
  outline: '#757682'
  outline-variant: '#c5c6d2'
  surface-tint: '#435b9f'
  primary: '#00113a'
  on-primary: '#ffffff'
  primary-container: '#002366'
  on-primary-container: '#758dd5'
  inverse-primary: '#b3c5ff'
  secondary: '#545f72'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f7'
  on-secondary-container: '#586377'
  tertiary: '#0e151a'
  on-tertiary: '#ffffff'
  tertiary-container: '#23292f'
  on-tertiary-container: '#8a9097'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#00174a'
  on-primary-fixed-variant: '#2a4386'
  secondary-fixed: '#d8e3fa'
  secondary-fixed-dim: '#bcc7dd'
  on-secondary-fixed: '#111c2c'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#dde3eb'
  tertiary-fixed-dim: '#c1c7cf'
  on-tertiary-fixed: '#161c22'
  on-tertiary-fixed-variant: '#41474e'
  background: '#f9f9ff'
  on-background: '#161c27'
  surface-variant: '#dde2f3'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  mono-md:
    fontFamily: monospace
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1024px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  section-gap: 64px
---

## Brand & Style

The brand personality is academic, authoritative, and stoic. Designed for high-stakes exam preparation, the UI must evoke a sense of focused calm and absolute reliability. This design system follows a **Minimalist** philosophy, stripping away all decorative elements to ensure the cognitive load is reserved entirely for the learning material.

The visual direction avoids trends like gradients or glassmorphism in favor of a "document-first" approach. High-contrast ratios, crisp edges, and a structured hierarchy signal institutional credibility. The interface should feel less like a "startup app" and more like a professional testing environment or a prestige digital library.

## Colors

The palette is restricted to three core functional areas:
- **Primary (Deep Navy):** Used exclusively for primary actions, progress indicators, and subtle branding accents. It represents institutional trust.
- **Surface (Pure White):** The background is kept #FFFFFF to maximize contrast and mimic the feel of a physical exam paper or professional document.
- **Typography (Charcoal):** #1A202C is used for body text to provide high legibility without the harshness of pure black.
- **System Colors:** Success (Green), Error (Red), and Warning (Amber) should be used sparingly, primarily within feedback loops after an answer is submitted. Use desaturated versions to maintain the professional tone.

## Typography

This design system utilizes **Inter** for all roles to maintain a systematic, utilitarian aesthetic. 

- **Headlines:** Use tight letter spacing (-0.02em) to create a compact, authoritative look.
- **Body Text:** Designed for long-form reading. The 18px `body-lg` is the default for exam questions to ensure maximum readability and accessibility.
- **Labels:** Use uppercase with slight letter spacing for meta-data (e.g., "SECTION 1", "TIME REMAINING") to distinguish them clearly from the content.
- **Line Height:** Generous line heights are maintained to prevent visual crowding during intense study sessions.

## Layout & Spacing

The layout philosophy is based on a **Fixed Grid** for content-heavy pages to prevent line lengths from becoming too wide for comfortable reading. 

- **Max Width:** Content containers should not exceed 1024px for reading optimization.
- **Vertical Rhythm:** Use a strict 8px base unit. Large sections (e.g., separating a question from the answer choices) should use `section-gap` (64px) to provide "breathing room" and reduce anxiety.
- **Safe Margins:** Use 40px margins on desktop to push content toward the center, creating a focused "stage" for the exam material.

## Elevation & Depth

This design system rejects traditional shadows. Depth is communicated through **Low-contrast outlines** and **Tonal Layers**.

- **Level 0:** Pure white background (#FFFFFF).
- **Level 1:** Content cards or sections use a 1px solid border (#E2E8F0). No shadow.
- **Selection:** Active states (like a selected multiple-choice answer) use a 2px solid border in the Primary Navy (#002366) with a very subtle light blue background tint (#F0F4F8).
- **Modals:** Use a heavy 4px solid black border or a very dark overlay to dim the background, emphasizing focus.

## Shapes

The shape language is **Soft (0.25rem)**. 

While the brand is serious, a subtle radius prevents the UI from feeling dated or overly aggressive. Interactive elements like buttons and input fields use a consistent 4px (0.25rem) radius. Large containers and cards may use `rounded-lg` (8px) to soften the structure of the page without losing the professional edge.

## Components

- **Buttons:** Primary buttons are solid Deep Navy (#002366) with white text. Secondary buttons are outlined (1px border) with no background. No gradients or shadows are permitted.
- **Multiple Choice Chips:** Large, full-width blocks with 1px borders. On hover, the border darkens. On selection, the border thickens to 2px Primary Navy.
- **Input Fields:** Minimalist design—1px grey border that transitions to Primary Navy on focus. Label text is always visible (no floating labels) to maintain clarity.
- **Progress Bars:** Thin, 4px height bars. Use the Primary Navy for completion status. For timed exams, use a neutral grey track to avoid distracting the user.
- **Status Badges:** Small, rectangular tags with "Soft" roundedness. Use `label-md` typography for high legibility at small sizes.
- **Cards:** Use them to group question sets. A simple 1px border is the only divider; do not use background fills for cards on the main surface.