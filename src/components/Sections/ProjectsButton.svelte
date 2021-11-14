<script>
	import { toggleClasses } from '../../utils/index';

	export let lang = 'en';
	let buttonText = 'Show more',
		isOpen = false,
		i18n = {
			en: {
				textShow: 'Show more',
				textClose: 'Show less'
			},
			ja: {
				textShow: 'もっと見る',
				textClose: '閉じる'
			}
		};

	lang = lang in i18n ? lang : 'en';
	buttonText = i18n[lang].textShow;

	const handleClick = (e) => {
		for (const project of document.querySelectorAll('div[data-project-key]'))
			if (project.dataset.projectKey > 0) {
				toggleClasses(
					project,
					'max-h-0',
					'opacity-0',
					'opacity-100',
					'max-h-[1200px]',
					'md:max-h-[800px]'
				);
				buttonText =
					buttonText === i18n[lang].textShow ? i18n[lang].textClose : i18n[lang].textShow;
				isOpen = !isOpen;
			}
	};
</script>

<button
	on:click={handleClick}
	class="btn btn-sm btn-primary transition-all {isOpen ? 'mt-4' : 'mt-0'}">{buttonText}</button
>
