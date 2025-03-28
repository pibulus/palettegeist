# FILE STRUCTURE – Palettegeist (SvelteKit)

```
palettegeist/
├── src/
│   ├── lib/
│   │   ├── features/
│   │   │   ├── upload/
│   │   │   │   ├── UploadDropzone.svelte
│   │   │   │   ├── upload.store.ts
│   │   │   │   └── helpers.ts
│   │   │   ├── preview/
│   │   │   │   └── ImagePreview.svelte
│   │   │   ├── palette/
│   │   │   │   ├── PaletteGrid.svelte
│   │   │   │   ├── palette.store.ts
│   │   │   │   └── colorUtils.ts
│   │   │   ├── theme/
│   │   │   │   ├── ThemeToggle.svelte
│   │   │   │   └── theme.store.ts
│   │   │   └── toast/
│   │   │       ├── Toast.svelte
│   │   │       └── toast.store.ts
│   │   └── utils/
│   │       ├── format.ts         # RGB→HEX, etc.
│   │       └── localStorage.ts   # optional local palette save
│   ├── routes/
│   │   └── +page.svelte          # main app view
│   └── app.css
├── tailwind.config.cjs
├── svelte.config.js
├── vite.config.ts
├── package.json
└── README.md
```

## Conventions
- features/ = self-contained domains (upload, palette, theme, etc.)
- store.ts files = state per feature
- utils/ = shared logic, non-feature-specific
- Top-level layout can include `<Toast />`, theme classes, global styles