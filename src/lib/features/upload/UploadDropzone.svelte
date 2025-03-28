<script lang="ts">
  import { imageUrl } from './upload.store';
  import { validateImageFile } from './helpers';
  import { showToast } from '../toast/toast.store';

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
    const file = files[0];
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    
    if (validTypes.includes(file.type)) {
      const objectUrl = URL.createObjectURL(file);
      imageUrl.set(objectUrl);
    } else {
      showToast('Please upload a valid image file (JPG, PNG, or WebP)');
    }
  }
</script>

<div 
  class="border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer max-w-xl mx-auto shadow-md"
  class:border-primary={dragActive}
  class:bg-base-200={!dragActive} 
  class:bg-base-300={dragActive}
  on:dragenter={handleDragEnter}
  on:dragover={handleDragOver}
  on:dragleave={handleDragLeave}
  on:drop={handleDrop}
  on:click={() => fileInput.click()}
>
  <div class="flex flex-col items-center justify-center gap-6 py-4">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
    <div>
      <h2 class="text-xl font-medium mb-2">Drag and drop an image or click to browse</h2>
      <p class="text-sm opacity-70">Supports JPG, PNG, and WebP</p>
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