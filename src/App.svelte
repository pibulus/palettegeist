<script lang="ts">
  import UploadDropzone from './lib/features/upload/UploadDropzone.svelte';
  import ImagePreview from './lib/features/preview/ImagePreview.svelte';
  import PaletteGrid from './lib/features/palette/PaletteGrid.svelte';
  import ThemeToggle from './lib/features/theme/ThemeToggle.svelte';
  import Toast from './lib/features/toast/Toast.svelte';
  import { imageUrl } from './lib/features/upload/upload.store';
  import { theme } from './lib/features/theme/theme.store';
  import { fade } from 'svelte/transition';

  // Update document theme when theme store changes
  $: if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', $theme);
  }
</script>

<div class="min-h-screen transition-colors duration-300 bg-base-100 px-4 py-8">
  <div class="container mx-auto max-w-5xl">
    <header class="mb-12 flex items-center justify-between">
      <h1 class="text-3xl font-bold">Palettegeist</h1>
      <ThemeToggle />
    </header>

    <main class="flex flex-col gap-10">
      <UploadDropzone />
      
      {#if $imageUrl}
        <div in:fade={{ duration: 300 }}>
          <ImagePreview />
        </div>
        
        <div in:fade={{ duration: 300, delay: 100 }}>
          <PaletteGrid />
        </div>
      {/if}
    </main>
    
    <footer class="mt-20 text-center text-sm opacity-60 pb-4">
      <p>Created with Svelte, Tailwind CSS, and DaisyUI</p>
    </footer>
  </div>
  
  <Toast />
</div>