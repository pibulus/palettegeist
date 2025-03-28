# FEATURE SPEC – Palettegeist MVP

## 1. Image Upload

### Requirements
- Accept image via:
  - Drag-and-drop
  - Manual file input
- Accept formats: .jpg, .jpeg, .png, .webp
- Validate file type before processing

### Output
- imageUrl: string (object URL from uploaded file)
- Emit image to preview + color extraction logic

## 2. Image Preview

### Requirements
- Display uploaded image responsively
- Max height: 300px
- Add rounded corners and subtle shadow

### Output
- `<img>` tag with src={imageUrl}

## 3. Color Extraction

### Requirements
- Use ColorThief.getPalette(image, 9)
- Requires image to be loaded in DOM
- Result: array of 9 RGB triplets: number[][]

### Output
- Store: paletteColors: number[][]
- Format example: [[255, 0, 0], [34, 67, 89], ...]

## 4. Palette Display

### Requirements
- Render 9 color swatches in grid
- Each swatch:
  - Uses background-color: rgb(...)
  - Displays hex code
  - Click → copies hex code
- Responsive: 3x3 on mobile, inline on desktop

## 5. Click-to-Copy + Toast

### Requirements
- Clicking a swatch copies hex code
- Use native navigator.clipboard.writeText()
- Show toast confirmation for 2s

## 6. Theme Switching

### Requirements
- Use DaisyUI themes
- UI: `<select>` or toggle for switching
- Persist theme with localStorage

## 7. Performance & UX
- Load image via URL.createObjectURL
- Handle large image sizes efficiently
- No layout shifts during image load
- Use fade or scale transitions (Svelte-native)

## State Summary

| Store | Type | Purpose |
|-------|------|--------|
| imageUrl | string | Source for preview + extract |
| paletteColors | number[][] | 9 extracted RGB triplets |
| toastMessage | string \| null | Message for toast display |
| theme | string | DaisyUI theme name |