<script>
	import { onMount, onDestroy } from 'svelte';
	import greetings_i18n from './greetingi18n.json';

	export let date = null,
		lang = 'en';

	lang = lang in greetings_i18n ? lang : 'en';

	let greeting = getGreeting(new Date().getHours()),
		interval = null;

	function getGreeting(hour) {
		if ((hour >= 5 && hour < 12) || hour < 12) {
			return greetings_i18n[lang].morning;
		} else if (hour <= 17) {
			return greetings_i18n[lang].afternoon;
		} else {
			return greetings_i18n[lang].evening;
		}
	}

	$: hour = date && date.getHours();
	$: getGreeting(hour);

	onMount(() => {
		if (!date) {
			date = new Date();
			const milliseconds = date.getMilliseconds();
			const delay = milliseconds < 1000 * 60 * 60 ? 1000 * 60 * 60 - milliseconds : 0;
			setTimeout(() => {
				interval = setInterval(() => {
					date = new Date();
				}, 1000 * 60 * 60);
			}, delay);
		}
	});

	onDestroy(() => interval && clearInterval(interval));
</script>

<span>{greeting}</span>
