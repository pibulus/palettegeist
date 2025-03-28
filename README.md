# Palettegeist

A local-first web app that extracts and displays a 9-color palette from any uploaded image.

## Features

- Drag-and-drop or file input for image upload
- Preview uploaded image
- Extract 9 dominant colors using ColorThief
- Display palette as a swatch grid
- Click swatch to copy hex code to clipboard
- Toast confirmation when color is copied
- Light/dark theme support with DaisyUI

## Tech Stack

- Framework: Svelte
- Styling: TailwindCSS + DaisyUI
- Color extraction: ColorThief
- Clipboard: Native Web Clipboard API
- Transitions: Native Svelte transitions

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```