<script>
	import { onMount, onDestroy } from 'svelte';

	export let date = null;

	let interval = null;

	$: locale = navigator.language;

	const formatter = new Intl.DateTimeFormat(locale, {
		hour12: true,
		hour: 'numeric',
		minute: '2-digit'
	});

	onMount(() => {
		if (!date) interval = setInterval(() => (date = new Date()), 1000);
	});

	onDestroy(() => interval && clearInterval(interval));
</script>

<span>
	{formatter.format(date)}
</span>
