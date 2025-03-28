# DEV NOTES – Palettegeist

## General
- Use SvelteKit
- TailwindCSS + DaisyUI for all styling
- Use ColorThief via npm install colorthief
- Use native clipboard + toast system for copy feedback

## Image Handling
- Accept single image per session
- Use URL.createObjectURL for preview
- Image must be fully loaded before extracting palette
- Handle onload events before calling ColorThief.getPalette(img, 9)

## Color Extraction
- Result: array of 9 RGB triplets
- Convert to hex using util:

```ts
const rgbToHex = ([r, g, b]) =>
  "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
```

## Stores
- Use Svelte's writable for:
  - imageUrl
  - paletteColors
  - toastMessage
  - currentTheme

## DOM & Event Flow
1. Dropzone receives file
2. File converted to URL
3. Preview rendered
4. Image onload triggers palette extraction
5. Palette stored + passed to swatch grid

## Toast System
- Shared toast store with auto-clear
- toast.set("Copied #aabbcc")
- `<Toast />` lives in root layout

## Theme
- Use DaisyUI themes via `<html data-theme="X">`
- Set default theme on load
- Provide toggle in footer

## Performance
- Lightweight. No heavy dependencies.
- No unnecessary reactivity or rerenders
- Respect SvelteKit routing structure

## Deployment
- Local-only (no deployment needed yet)
- Build should run via npm run dev or npm run build

## Misc
- Use feature-based file structure (see file-structure.md)
- Code must be clean, readable, modular
- Future extensibility required: do not hard-code logic into view files