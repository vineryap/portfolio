<script>
	import { onDestroy } from 'svelte';
	import Greeting from './Greeting.svelte';
	import Time from './Time.svelte';

	let date = new Date();

	const interval = setInterval(() => {
		date = new Date();
	}, 1000);

	onDestroy(() => clearInterval(interval));
</script>

<div class="relative w-full items-center text-center group">
	<div
		class="absolute w-full h-10 transition-all opacity-0 group-active:opacity-100 group-hover:opacity-100 font-medium select-none text-neutral"
	>
		<Time {date} />
	</div>

	<div
		class="absolute w-full h-10 transition-all opacity-100 group-active:opacity-0 group-hover:opacity-0 font-medium select-none text-neutral"
	>
		<Greeting {date} />
	</div>
</div>
