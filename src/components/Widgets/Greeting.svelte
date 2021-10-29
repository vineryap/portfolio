<script>
	import { onMount, onDestroy } from 'svelte';

	export let date = null;

	let greeting = '',
		interval = null;

	$: hour = date && date.getHours();

	$: {
		if (hour >= 5 && hour < 12) {
			greeting = 'Good morning ☀️';
		} else if (hour < 17) {
			greeting = 'Good afternoon 👋';
		} else {
			greeting = 'Good evening 🌒';
		}
	}

	onMount(() => {
		if (!date) {
			interval = setInterval(() => {
				date = new Date();
			}, 1000);
		}
	});

	onDestroy(() => interval && clearInterval(interval));
</script>

<span>{greeting}</span>
