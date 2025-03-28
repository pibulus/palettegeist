<script lang="ts">
  import UploadDropzone from './lib/features/upload/UploadDropzone.svelte';
  import ImagePreview from './lib/features/preview/ImagePreview.svelte';
  import PaletteGrid from './lib/features/palette/PaletteGrid.svelte';
  import Toast from './lib/features/toast/Toast.svelte';
  import { imageUrl } from './lib/features/upload/upload.store';
  import { theme } from './lib/features/theme/theme.store';
  import { fade, fly, slide } from 'svelte/transition';

  // Set default theme to a more colorful option
  $: if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', 'cupcake');
  }
</script>

<!-- Glassmorphic background with gradient -->
<div class="min-h-screen bg-gradient-to-br from-indigo-500 via-violet-400 to-amber-300">
  <!-- Decorative elements -->
  <div class="fixed top-20 left-10 w-40 h-40 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
  <div class="fixed top-40 right-20 w-56 h-56 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
  <div class="fixed bottom-20 left-20 w-60 h-60 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
  
  <header class="bg-[#1a1a1a] shadow-md fixed top-0 left-0 right-0 z-50">
    <div class="container mx-auto px-6 py-3.5">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-amber-400">
          Palettegeist <span class="text-base">✨</span>
        </h1>
        <div class="text-xs text-gray-400 font-medium">Extract colors from any image</div>
      </div>
    </div>
  </header>
  
  <!-- Spacer to prevent content from appearing under fixed header -->
  <div class="h-14"></div>

  <main class="container mx-auto px-4 py-3 max-w-6xl relative z-10 h-[calc(100vh-56px)] flex flex-col">
    <!-- Upload area - at the top -->
    <div class="card bg-white shadow-md border border-gray-100 rounded-xl mb-5" in:slide={{ duration: 400 }}>
      <div class="card-body p-4">
        <h2 class="text-lg font-semibold text-indigo-800 mb-2 tracking-tight">Drop an image</h2>
        <UploadDropzone />
      </div>
    </div>
    
    {#if $imageUrl}
      <div class="grid gap-4 grid-cols-2 flex-grow" in:fade={{ duration: 300 }}>
        <!-- Image Preview - left column -->
        <div class="card bg-white shadow-md border border-gray-100 rounded-xl overflow-hidden h-full" 
          in:fly={{ y: 20, duration: 400 }}>
          <div class="card-body p-4">
            <h2 class="text-lg font-semibold text-indigo-800 mb-2 tracking-tight">Image Preview</h2>
            <div class="h-[calc(100%-40px)]">
              <ImagePreview />
            </div>
          </div>
        </div>
        
        <!-- Color Palette - right column -->
        <div class="card bg-white shadow-md border border-gray-100 rounded-xl h-full" 
          in:fly={{ y: 20, duration: 400, delay: 100 }}>
          <div class="card-body p-4">
            <PaletteGrid />
          </div>
        </div>
      </div>
    {:else}
      <div class="card bg-white shadow-md border border-gray-100 rounded-xl p-6 text-center mt-4 flex-grow flex items-center justify-center" 
        in:fade={{ duration: 300 }}>
        <div class="flex flex-col items-center py-6">
          <div class="w-14 h-14 rounded-md bg-indigo-100 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-indigo-800 mb-1 tracking-tight">Ready to Extract Colors</h3>
          <p class="text-indigo-600 opacity-90 text-sm">Drop an image to generate your palette</p>
        </div>
      </div>
    {/if}
    
    <footer class="mt-auto py-2 text-center">
      <p class="text-sm font-medium text-indigo-700 inline-block px-4 py-1">
        ✨ Created by Ian and Pabs ❤️ ✨
      </p>
    </footer>
  </main>
  
  <Toast />
</div>