<script lang="ts">
  import { paletteColors } from './palette.store';
  import { rgbToHex } from '../../utils/format';
  import { showToast } from '../toast/toast.store';

  function copyToClipboard(hexColor: string) {
    navigator.clipboard.writeText(hexColor)
      .then(() => {
        showToast(`Copied ${hexColor} to clipboard`);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }
</script>

<div class="card bg-base-100 shadow-lg p-6 rounded-xl">
  <h2 class="text-2xl font-semibold mb-6">Color Palette</h2>

  {#if $paletteColors.length > 0}
    <div class="grid grid-cols-3 sm:grid-cols-9 gap-4">
      {#each $paletteColors as color}
        {@const hexColor = rgbToHex(color)}
        <button 
          class="aspect-square rounded-xl shadow-md hover:scale-105 transition-transform cursor-pointer flex flex-col items-center justify-center relative group"
          style="background-color: rgb({color[0]}, {color[1]}, {color[2]});"
          on:click={() => copyToClipboard(hexColor)}
          title="Click to copy"
        >
          <span class="absolute bottom-2 opacity-90 text-xs font-mono px-2 py-1 bg-base-100 bg-opacity-80 rounded-full">
            {hexColor}
          </span>
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span class="bg-base-100 bg-opacity-70 text-sm px-3 py-1 rounded-full">
              Click to copy
            </span>
          </div>
        </button>
      {/each}
    </div>
  {:else}
    <div class="text-center p-8 text-base-content opacity-60">
      <p>No colors extracted yet</p>
    </div>
  {/if}
</div>