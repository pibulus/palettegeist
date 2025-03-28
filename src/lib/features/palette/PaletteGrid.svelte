<script lang="ts">
  import { paletteColors, colorCount } from './palette.store';
  import { rgbToHex } from '../../utils/format';
  import { showToast } from '../toast/toast.store';
  import { getContrastColor } from './colorUtils';
  import { fade, fly } from 'svelte/transition';

  function copyToClipboard(hexColor: string) {
    navigator.clipboard.writeText(hexColor)
      .then(() => {
        showToast(`Copied ${hexColor} to clipboard`);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }
  
  // For sorting colors (optional, makes palette more visually pleasing)
  function sortColors(colors: number[][]): number[][] {
    return [...colors].sort((a, b) => {
      // Calculate rough luminance
      const lumA = 0.299 * a[0] + 0.587 * a[1] + 0.114 * a[2];
      const lumB = 0.299 * b[0] + 0.587 * b[1] + 0.114 * b[2];
      return lumB - lumA; // Bright to dark
    });
  }
  
  $: sortedColors = sortColors($paletteColors);
</script>

<div class="flex justify-between items-center mb-6">
  <h2 class="text-xl font-semibold text-indigo-800 tracking-tight flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
    Color Palette
  </h2>
  
  <div class="join bg-white shadow-sm">
    <button 
      class="join-item btn btn-sm border-gray-200" 
      class:btn-active={$colorCount === 9}
      class:bg-indigo-50={$colorCount === 9}
      class:text-indigo-700={$colorCount === 9}
      on:click={() => colorCount.set(9)}
    >
      9
    </button>
    <button 
      class="join-item btn btn-sm border-gray-200"
      class:btn-active={$colorCount === 16}
      class:bg-indigo-50={$colorCount === 16}
      class:text-indigo-700={$colorCount === 16}
      on:click={() => colorCount.set(16)}
    >
      16
    </button>
  </div>
</div>

{#if sortedColors.length > 0}
  <div 
    class="grid gap-3"
    class:grid-cols-3={$colorCount === 9}
    class:grid-cols-4={$colorCount === 16}
    in:fade={{ duration: 300 }}
  >
    {#each sortedColors as color, i (rgbToHex(color))}
      {@const hexColor = rgbToHex(color)}
      {@const contrastColor = getContrastColor(color)}
      <div 
        class="color-swatch" 
        in:fly={{ y: 15, delay: i * 25, duration: 200 }}
      >
        <button 
          class="w-full aspect-square rounded-lg border border-gray-100 shadow-sm hover:shadow transition-all cursor-pointer flex flex-col items-center justify-center relative overflow-hidden group"
          style="background-color: rgb({color[0]}, {color[1]}, {color[2]});"
          on:click={() => copyToClipboard(hexColor)}
          title="Click to copy {hexColor}"
        >
          <!-- Simple hover overlay -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-5 transition-opacity duration-200 flex items-center justify-center">
            <div class="bg-white bg-opacity-80 shadow-md rounded-md py-1 px-3">
              <span 
                class="font-mono text-xs font-medium"
                style="color: #333;"
              >
                {hexColor}
              </span>
            </div>
          </div>
          
          <!-- Copy icon - appears when hovering -->
          <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div 
              class="w-6 h-6 rounded bg-white bg-opacity-70 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </button>
        
        <!-- Color hex display below swatch with copy indicator -->
        <div class="mt-2 flex justify-between items-center px-1">
          <span class="text-xs font-mono text-gray-600 font-medium">{hexColor}</span>
          <div class="badge badge-xs badge-neutral">copy</div>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <div class="flex flex-col items-center justify-center py-10">
    <div class="w-12 h-12 rounded-md bg-white shadow-sm flex items-center justify-center mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    </div>
    <p class="text-indigo-800 text-sm font-medium">Waiting for image</p>
    <p class="text-gray-500 text-xs mt-1">Select an image to extract colors</p>
  </div>
{/if}