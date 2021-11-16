<script>
	import { onMount, onDestroy } from 'svelte';
	import greetings_i18n from './greetingi18n.json';

	export let date = null,
		lang = 'en';

	lang = lang in greetings_i18n ? lang : 'en';

	function getGreeting(hour) {
		if ((hour >= 5 && hour < 12) || hour < 12) {
			return greetings_i18n[lang].morning;
		} else if (hour <= 17) {
			return greetings_i18n[lang].afternoon;
		} else {
			return greetings_i18n[lang].evening;
		}
	}

	let interval = null;

	$: greeting = date ? getGreeting(date.getHours()) : getGreeting(new Date().getHours());

	onMount(() => {
		if (!date) {
			date = new Date();
			const minutes = date.getMinutes();
			const delay = minutes === 0 ? 0 : (60 - minutes) * 60 * 1000;
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
