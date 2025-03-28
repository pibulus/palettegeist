<script lang="ts">
  import { theme } from './theme.store';

  function handleThemeChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    $theme = target.value;
  }
</script>

<select
  class="select select-sm select-bordered w-full max-w-xs"
  value={$theme}
  on:change={handleThemeChange}
>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="cupcake">Cupcake</option>
  <option value="dracula">Dracula</option>
  <option value="pastel">Pastel</option>
  <option value="coffee">Coffee</option>
</select>