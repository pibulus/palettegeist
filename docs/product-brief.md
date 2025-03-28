# PRODUCT BRIEF – Palettegeist

## Summary
A local-first web app that extracts and displays a 9-color palette from any uploaded image. Users can drag and drop or manually upload an image. The app previews the image and displays 9 dominant colors as clickable swatches that copy their hex codes to clipboard.

## Core Features (MVP)
- Drag-and-drop or file input for image
- Preview uploaded image
- Extract 9 dominant colors using ColorThief
- Display palette as a swatch grid
- Click swatch → copy hex code to clipboard
- Toast or tooltip confirmation
- Responsive UI, clean layout
- Local dev only (no deployment, no auth)

## Design Requirements
- Use Tailwind CSS with DaisyUI
- Light/dark themes switchable via DaisyUI
- UX should feel minimal, fast, tactile
- No unnecessary animations or libraries

## Stack
- Framework: SvelteKit
- Styling: TailwindCSS + DaisyUI
- Color extraction: ColorThief
- Clipboard: Native Web Clipboard API
- Transitions: Native Svelte transitions

## Notes
- Do not use external backends or APIs
- App must function fully offline in local browser
- Future extensibility is expected, use modular structure
