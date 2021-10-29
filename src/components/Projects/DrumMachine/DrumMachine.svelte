<script lang="ts">
	import { onMount } from 'svelte';
	import {
		bankOne as heaterKit,
		bankTwo as pianoKit,
		handleKeydown,
		handleKeyup,
		play,
		removeFocus
	} from './drummachine.js';
	import { checkNonDesktopBrowsers } from '../../../utils/index';

	let isHeaterKit: boolean = true,
		isPowerOn: boolean = true,
		isMobileBrowser: boolean = false,
		volume: number = 0.3;

	onMount(() => (isMobileBrowser = checkNonDesktopBrowsers()));
</script>

<svelte:body
	on:keydown={(e) => {
		handleKeydown(e, isHeaterKit);
	}}
	on:keyup={(e) => {
		handleKeyup(e, isHeaterKit);
	}} />

<div class="flex flex-col items-center md:gap-4 p-8">
	<label for="power" class="capitalize">Power</label>
	<input
		id="power"
		type="checkbox"
		bind:checked={isPowerOn}
		on:change={removeFocus}
		class="toggle border-opacity-10 bg-opacity-100 toggle-secondary checked:bg-secondary checked:fill-current checked:text-secondary"
	/>

	{#if isMobileBrowser}
		<label for="volume" class="text-red-600 mt-10"
			>Volume control is not accessible on mobile or tablet browsers. Please use the device volume
			controls.</label
		>
	{:else}
		<label for="volume" class="capitalize mt-10">Volume</label>
	{/if}
	<input
		id="volume"
		type="range"
		min="0.0"
		max="1.0"
		step="0.0001"
		bind:value={volume}
		on:change={removeFocus}
		class="w-full md:w-1/3 range rg-accent"
		disabled={isPowerOn === false || isMobileBrowser}
	/>

	<label for="bank" class="capitalize mt-6">Bank</label>
	<input
		id="bank"
		type="checkbox"
		bind:checked={isHeaterKit}
		on:change={removeFocus}
		class="toggle border-opacity-10 bg-opacity-100 {!isHeaterKit
			? 'bg-accent border-accent'
			: 'bg-primary border-primary'}"
		disabled={isPowerOn === false}
	/>

	{#key isHeaterKit && isPowerOn}
		<h2
			id="display"
			class="w-full md:w-1/2 mt-10 md:mt-20 text-3xl text-center {isHeaterKit
				? 'text-primary border-primary'
				: 'text-accent border-accent'} font-bold capitalize border-2 rounded-lg p-2 min-h-16"
		>
			{isPowerOn ? (isHeaterKit ? 'Heater Kit' : 'Smooth Piano Kit') : ''}
		</h2>
	{/key}
</div>
<div class="w-full md:w-2/3 grid grid-cols-3 gap-2 md:gap-4 mx-auto">
	{#each isHeaterKit ? heaterKit : pianoKit as { keyCode, keyTrigger, id, url }}
		<button
			{id}
			on:mouseup|self={play}
			class="drum-pad h-12 py-14 rounded-md flex items-center justify-center text-center text-white text-2xl font-extrabold {isHeaterKit
				? 'bg-primary focus:bg-secondary'
				: 'bg-accent focus:bg-secondary'}"
		>
			{keyTrigger}
			<audio
				id={keyTrigger}
				bind:volume
				data-key={keyCode}
				class="clip hidden opacity-0 invisible"
				controls
				src={isPowerOn ? url : '#'}
				muted={isPowerOn === false}
			>
				Your browser does not support the
				<code>audio</code> element.
			</audio>
		</button>
	{/each}
</div>

<style>
	input.rg-accent[type='range']::-webkit-slider-thumb,
	input.rg-accent[type='range']::-moz-range-thumb,
	input.rg-accent[type='range']::-ms-thumb {
		@apply bg-accent;
	}
</style>
