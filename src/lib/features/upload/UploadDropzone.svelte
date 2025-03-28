<script lang="ts">
  import { imageUrl } from './upload.store';
  import { validateImageFile } from './helpers';
  import { showToast } from '../toast/toast.store';
  import { fade } from 'svelte/transition';
  import { paletteColors } from '../palette/palette.store';

  let dragActive = false;
  let fileInput: HTMLInputElement;

  function handleDragEnter(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragActive = true;
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragActive = true;
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragActive = false;
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragActive = false;
    
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }

  function handleFileInput(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      handleFiles(target.files);
    }
  }

  function handleFiles(files: FileList) {
    console.log('Files dropped/selected:', files);
    const file = files[0];
    console.log('Processing file:', file.name, file.type, file.size);
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    
    if (validTypes.includes(file.type)) {
      console.log('File type valid, creating object URL');
      // Always reset the image URL first, then palette colors
      // This ensures the image preview gets a fresh start
      imageUrl.set('');
      paletteColors.set([]);
      
      // Small timeout to ensure DOM updates before setting the new image
      setTimeout(() => {
        const objectUrl = URL.createObjectURL(file);
        console.log('Object URL created:', objectUrl);
        imageUrl.set(objectUrl);
      }, 50);
    } else {
      console.log('Invalid file type:', file.type);
      showToast('Please upload a valid image file (JPG, PNG, or WebP)');
    }
  }
</script>

<div 
  class="border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer text-center flex flex-col items-center relative overflow-hidden group"
  class:border-indigo-400={!dragActive}
  class:border-amber-500={dragActive}
  class:bg-opacity-10={!dragActive} 
  class:bg-opacity-30={dragActive}
  class:border-opacity-40={!dragActive}
  class:border-opacity-100={dragActive}
  on:dragenter={handleDragEnter}
  on:dragover={handleDragOver}
  on:dragleave={handleDragLeave}
  on:drop={handleDrop}
  on:click={() => fileInput.click()}
  in:fade={{ duration: 300 }}
>
  <!-- Visual cue when dragging - no animation to prevent flickering -->
  {#if dragActive}
    <div class="absolute inset-0 bg-indigo-100"></div>
  {/if}
  
  <div class="bg-indigo-100 rounded-md w-14 h-14 flex items-center justify-center mb-4 z-10">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  </div>
  
  <div class="text-center relative z-10">
    <p class="font-medium text-lg mb-2 text-indigo-900">Drop image or click to upload</p>
    <div class="flex gap-2 justify-center">
      <div class="badge badge-sm badge-primary">JPG</div>
      <div class="badge badge-sm badge-secondary">PNG</div>
      <div class="badge badge-sm badge-accent">WebP</div>
    </div>
  </div>
  
  <input 
    type="file" 
    bind:this={fileInput}
    on:change={handleFileInput}
    accept=".jpg,.jpeg,.png,.webp"
    class="hidden"
  />
</div>

{#if $imageUrl}
  <div class="mt-6 flex justify-center">
    <button 
      class="btn btn-sm btn-error btn-outline gap-2 glass border border-indigo-200 border-opacity-50 backdrop-blur-sm shadow-md px-4 hover:bg-indigo-400 hover:bg-opacity-30"
      on:click={() => {
        imageUrl.set('');
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      Clear Image
    </button>
  </div>
{/if}