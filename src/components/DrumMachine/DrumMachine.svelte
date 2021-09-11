<script lang="ts">
  import {
    bankOne as heaterKit,
    bankTwo as pianoKit,
    handleKeydown,
    handleKeyup,
    play,
    removeFocus,
  } from './drummachine.js';

  let isHeaterKit: boolean = true,
    isPowerOn: boolean = true,
    volume: number = 0.3;
</script>

<svelte:body
  on:keydown={(e) => {
    handleKeydown(e, isHeaterKit);
  }}
  on:keyup={(e) => {
    handleKeyup(e, isHeaterKit);
  }}
/>

<div class="flex flex-col items-center gap-4 p-8">
  <label for="power" class="capitalize">Power</label>
  <input
    id="power"
    type="checkbox"
    bind:checked={isPowerOn}
    on:change={removeFocus}
    class="toggle border-opacity-10 bg-opacity-100 toggle-secondary"
  />

  <label for="volume" class="capitalize mt-10">Volume</label>
  <input
    id="volume"
    type="range"
    min="0"
    max="1"
    step="0.0001"
    bind:value={volume}
    on:change={removeFocus}
    class="range {isHeaterKit ? 'range-primary' : 'range-accent'} w-3/6"
    disabled={isPowerOn === false}
  />

  <label for="bank" class="capitalize mt-6">Bank</label>
  <input
    id="bank"
    type="checkbox"
    bind:checked={isHeaterKit}
    on:change={removeFocus}
    class="toggle bg-accent border-accent border-opacity-10 bg-opacity-100 {!isHeaterKit
      ? 'toggle-accent'
      : 'toggle-primary'}"
    disabled={isPowerOn === false}
  />

  {#key isHeaterKit && isPowerOn}
    <h2
      id="display"
      class="mt-20 text-3xl text-center {isHeaterKit
        ? 'text-primary border-primary'
        : 'text-accent border-accent'} font-bold capitalize border-2 rounded-lg p-2 w-1/3"
    >
      {isPowerOn ? (isHeaterKit ? 'Heater Kit' : 'Smooth Piano Kit') : ''}
    </h2>
  {/key}
</div>
<div class="grid grid-cols-3 gap-4">
  {#each isHeaterKit ? heaterKit : pianoKit as { keyCode, keyTrigger, id, url }}
    <button
      {id}
      on:mouseup|self={play}
      class="drum-pad h-12 py-14 rounded-md flex items-center justify-center text-white text-2xl font-extrabold {isHeaterKit
        ? 'bg-primary focus:bg-secondary'
        : 'bg-accent focus:bg-warning'}"
    >
      {keyTrigger}
      <audio
        id={keyTrigger}
        bind:volume
        data-key={keyCode}
        class="clip hidden opacity-0 invisible"
        controls
        src={isPowerOn ? url : '#'}
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </button>
  {/each}
</div>
