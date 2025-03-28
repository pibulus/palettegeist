<script lang="ts">
  import { toastMessage } from './toast.store';
  import { fade, fly } from 'svelte/transition';
</script>

{#if $toastMessage}
  <div 
    class="toast toast-top toast-end z-50"
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="alert shadow-lg rounded-xl"
      in:fly={{ x: 20, duration: 300 }}
      out:fly={{ x: 20, duration: 200 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span class="font-medium">{$toastMessage}</span>
    </div>
  </div>
{/if}