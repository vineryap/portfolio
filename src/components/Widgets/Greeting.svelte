<script>
	import { onMount, onDestroy } from 'svelte';
	import greetings_i18n from './greetingi18n.json';

	export let date = null,
		lang = 'en';

	lang = lang in greetings_i18n ? lang : 'en';

	let greeting,
		interval = null;

	$: hour = date && date.getHours();

	$: {
		if ((hour >= 5 && hour < 12) || hour < 12) {
			greeting = greetings_i18n[lang].morning;
		} else if (hour <= 17) {
			greeting = greetings_i18n[lang].afternoon;
		} else {
			greeting = greetings_i18n[lang].evening;
		}
	}

	onMount(() => {
		greeting = '';
		if (!date) {
			interval = setInterval(() => {
				date = new Date();
			}, 1000);
		}
	});

	onDestroy(() => interval && clearInterval(interval));
</script>

<span>{greeting}</span>
