# DESIGN GUIDELINES – Palettegeist

## Visual Style
- **Aesthetic**: Minimal, calm, elegant. Visuals should defer to the content (images + palettes).
- **Spacing**: Generous padding/margins. Nothing cramped.
- **Rounding**: rounded-xl or 2xl for components, swatches, dropzones.
- **Shadows**: Subtle. Use shadow-lg or shadow-md, avoid glow or neon.

## Colors
- App chrome should be neutral (bg-base-100, text-base-content)
- Palette swatches use direct rgb(...) or hex color backgrounds
- Use DaisyUI themes (light/dark/custom): support toggling via dropdown

## Typography
- Tailwind default system font stack is fine.
- Text sizes:
  - Headings: text-2xl, text-3xl
  - Labels: text-sm or text-base
  - Hex codes in swatches: text-sm / font-mono for clarity

## Interaction
- **Swatches**: Hover + active states, cursor pointer
- **Transitions**: Use fade, scale, or fly sparingly, only where it aids feedback
- **Toasts**: Appear top-right, disappear after 2s

## Responsiveness
- **Swatches display**:
  - Mobile: 3x3 grid
  - Desktop: horizontal row or grid
- Dropzone and preview scale with container width, max-width: max-w-xl

## Microcopy (Default Mode)
- Keep tone simple, clear
- Use tooltips for copy hint: "Click to copy"
- Optional: "Mystic Mode" copy layer (toggleable later)

## Branding
- Name: Palettegeist
- Font/logo not required in MVP
- App should feel modular, not corporate

## Priority
- Clarity > Aesthetics > Novelty

## Tools
- TailwindCSS + DaisyUI (required)
- Native Svelte transitions

## Notes
- No animation just for flair
- No loaders/spinners unless processing time exceeds 500ms

## Summary
Design should feel like a color tool for humans, not an app for marketers.