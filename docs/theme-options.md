# THEME OPTIONS – Palettegeist

## System
- DaisyUI themes
- Switch by setting: document.documentElement.setAttribute('data-theme', 'theme-name')

## Enabled Themes
```js
daisyui: {
  themes: ["light", "dark", "cupcake", "dracula", "pastel", "coffee"]
}
```

## Default
- Load theme from localStorage if available
- Fallback: light

## Switcher Component
```svelte
<select
  class="select select-sm select-bordered"
  on:change={(e) => {
    const theme = e.target.value;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }}
>
  <option disabled selected>Select Theme</option>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="cupcake">Cupcake</option>
  <option value="dracula">Dracula</option>
  <option value="pastel">Pastel</option>
  <option value="coffee">Coffee</option>
</select>
```

## Placement
- Fixed in footer or settings area
- Optional toggle for "Mystic Mode" (copywriting change layer)