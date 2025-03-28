<script lang="ts">
  import { toastMessage } from './toast.store';
  import { fade, fly } from 'svelte/transition';
  
  // Check if the message might be a color
  $: isColorMessage = $toastMessage && $toastMessage.includes('#') && $toastMessage.includes('Copied');
  
  // Extract hex color if present
  $: hexColor = isColorMessage ? $toastMessage.match(/#[0-9A-Fa-f]{6}/)?.[0] || null : null;
</script>

{#if $toastMessage}
  <div 
    class="toast toast-top toast-end z-50"
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="backdrop-blur-md bg-white bg-opacity-30 border border-white border-opacity-30 shadow-lg rounded-xl overflow-hidden"
      in:fly={{ x: 20, duration: 300 }}
      out:fly={{ x: 20, duration: 200 }}
    >
      {#if isColorMessage && hexColor}
        <div class="flex items-center gap-3 p-3">
          <div 
            class="w-10 h-10 rounded-lg shadow-md border border-white border-opacity-30" 
            style="background-color: {hexColor};"
          />
          <div class="flex flex-col">
            <div class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span class="font-medium text-sm text-purple-900">Color copied!</span>
            </div>
            <span class="font-mono text-xs bg-white/20 px-2 py-0.5 rounded-md mt-1 text-purple-800">{hexColor}</span>
          </div>
        </div>
      {:else}
        <div class="flex items-center gap-3 p-3">
          <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="font-medium text-sm text-purple-800">{$toastMessage}</span>
        </div>
      {/if}
    </div>
  </div>
{/if}