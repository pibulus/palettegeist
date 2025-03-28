<script lang="ts">
  import { imageUrl } from '../upload/upload.store';
  import { paletteColors } from '../palette/palette.store';
  import { extractPalette } from '../palette/colorUtils';
  import { showToast } from '../toast/toast.store';
  import { fade } from 'svelte/transition';

  let imageElement: HTMLImageElement;
  let loading = false;

  async function handleImageLoad() {
    if (!imageElement || !imageElement.complete) return;
    
    try {
      loading = true;
      const colors = await extractPalette(imageElement, 9);
      paletteColors.set(colors);
    } catch (error) {
      console.error('Error extracting colors:', error);
      showToast('Error extracting colors from image');
    } finally {
      loading = false;
    }
  }
</script>

<div class="card bg-base-100 shadow-lg rounded-xl overflow-hidden max-w-xl mx-auto">
  {#if loading}
    <div class="flex justify-center items-center p-16" transition:fade={{ duration: 200 }}>
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>
  {:else if $imageUrl}
    <img 
      src={$imageUrl} 
      alt="Uploaded image" 
      bind:this={imageElement} 
      class="max-h-80 w-full object-contain rounded-xl" 
      on:load={handleImageLoad}
      transition:fade={{ duration: 300 }}
    />
  {/if}
</div>