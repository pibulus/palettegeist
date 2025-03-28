# Palettegeist Development Guide

## Project Overview
Palettegeist is a local-first web app that extracts and displays a 9-color palette from any uploaded image. Users can drag and drop or manually upload an image to see a preview and the dominant colors as clickable swatches that copy their hex codes to clipboard.

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run Svelte type checking and TypeScript validation

## Tech Stack
- **Framework**: Svelte 5
- **Styling**: Tailwind CSS 4 + DaisyUI 5
- **Color Extraction**: ColorThief
- **Clipboard**: Native Web Clipboard API
- **Transitions**: Native Svelte transitions

## Code Style Guidelines
- **TypeScript**: Use strict typing with TypeScript for all components and utilities
- **Components**: Follow Svelte 5 component structure with `<script lang="ts">` at the top
- **Naming**:
  - Files: PascalCase for components (.svelte), camelCase for utilities (.ts)
  - Variables/Functions: camelCase
  - Stores: camelCase with `$` prefix when accessing store values
- **Imports**: Group imports by external packages first, then internal modules
- **Error Handling**: Use try/catch blocks with specific error handling as in colorUtils.ts
- **State Management**: Use Svelte stores for shared state across components
- **CSS**: Use Tailwind CSS classes with DaisyUI components; avoid custom CSS when possible
- **Formatting**: Follow 2-space indentation throughout the codebase

## Feature Organization
Organize features in dedicated directories under src/lib/features with component, store, and utility files:
- **upload**: Image upload functionality with drag-and-drop
- **preview**: Image preview display
- **palette**: Color extraction and palette display
- **theme**: Theme switching with DaisyUI
- **toast**: Notification system for user actions

## Key Patterns
- **Color Handling**:
  - Extract colors using `ColorThief.getPalette(image, 9)`
  - Convert RGB arrays to hex using `rgbToHex` from utils/format.ts
  - Use contrast functions to ensure text is readable on any color
- **Local Storage**: Theme preferences are persisted with localStorage
- **Image Processing**: Use URL.createObjectURL for efficient image handling
- **Responsive Design**: UI adapts between mobile (3x3 grid) and desktop layouts

## Theme System
- Available themes: light, dark, cupcake, dracula, pastel, coffee
- Toggle themes via ThemeToggle component
- Theme is applied using `document.documentElement.setAttribute('data-theme', theme)`

## Design Philosophy
- Minimal, calm aesthetic that lets content (images + palettes) take center stage
- Clear feedback for user interactions (toasts for copied colors)
- Responsive layout with appropriate spacing
- No unnecessary animations or heavy dependencies