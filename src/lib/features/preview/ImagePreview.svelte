<script lang="ts">
  import { imageUrl } from '../upload/upload.store';
  import { paletteColors, colorCount } from '../palette/palette.store';
  import { extractPalette } from '../palette/colorUtils';
  import { showToast } from '../toast/toast.store';
  import { fade } from 'svelte/transition';

  let imageElement: HTMLImageElement;

  // Extract colors only on image load, no more reactive loops
  function handleImageLoad() {
    console.log('Image load event triggered');
    if (imageElement && imageElement.complete) {
      try {
        // Extract colors in the background without showing loading state
        extractPalette(imageElement, $colorCount)
          .then(colors => {
            paletteColors.set(colors);
          })
          .catch(error => {
            console.error('Error extracting colors:', error);
            showToast('Error extracting colors from image');
          });
      } catch (error) {
        console.error('Error starting extraction:', error);
      }
    }
  }
  
  // Listen for color count changes separately
  $: if ($colorCount && imageElement?.complete) {
    extractPalette(imageElement, $colorCount)
      .then(colors => {
        paletteColors.set(colors);
      })
      .catch(error => {
        console.error('Error updating with new color count:', error);
      });
  }
</script>

{#if $imageUrl}
  <div class="relative">
    <img 
      src={$imageUrl} 
      alt="Uploaded image" 
      bind:this={imageElement} 
      class="w-full object-contain max-h-64 rounded-lg" 
      on:load={handleImageLoad}
    />
  </div>
{/if}