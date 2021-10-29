<script>
	/** @jsxImportSource svelte */

	import { onMount } from 'svelte';
	import { checkNonDesktopBrowsers } from '../utils/index';

	let isNonDesktopBrowsers = true;

	const fCCModScript = () => {
		localStorage.setItem('fCC_null_hide', false);
		const shadow = document.querySelector('div#fcc_test_suite_wrapper').shadowRoot;
		const childNodes = Array.from(shadow.childNodes);
		!childNodes.length && setTimeout(() => fCCModScript(), 100);

		if (childNodes.length) {
			childNodes.forEach((childNode) => {
				if (childNode.nodeName === 'STYLE') {
					const StyleSheet = childNode.sheet;
					StyleSheet.insertRule(
						'div.fcc_test_ui, #fcc_test_suite_indicator_wrapper {top: 4rem;}',
						StyleSheet.cssRules.length
					);
					StyleSheet.insertRule(
						'#fcc_test_suite_indicator {background-color: #fbf9f2;}',
						StyleSheet.cssRules.length
					);
					StyleSheet.insertRule(
						' #fcc_foldout_menu {background-color: #fbf9f2;border-radius: 0 .5rem .5rem 0;}',
						StyleSheet.cssRules.length
					);
				}

				if (childNode.nodeName === 'DIV') {
					childNode.style.display = 'none';
				}
			});
		}
	};

	const buttonHandler = () => {
		const BUTTON = document.querySelector('#fcc_test_toggle');
		const defaultText = 'Show FCC Test Suite';

		const SHADOW = document.querySelector('#fcc_test_suite_wrapper').shadowRoot;

		const FCC_TEST_UI = SHADOW.querySelectorAll('div.fcc_test_ui');

		FCC_TEST_UI.forEach((Node) => {
			Node.style.display = Node.style.display === 'none' ? '' : 'none';
		});

		BUTTON.textContent = BUTTON.textContent === defaultText ? 'hide FCC Test Suite' : defaultText;
	};

	onMount(() => {
		isNonDesktopBrowsers = checkNonDesktopBrowsers();
	});
</script>

<svelte:head>
	{#if !isNonDesktopBrowsers}
		<script
			src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"
			on:load={fCCModScript}></script>
	{/if}
</svelte:head>

<div class={`${isNonDesktopBrowsers && 'hidden'} flex mb-20`}>
	<button
		id="fcc_test_toggle"
		type="button"
		on:click={buttonHandler}
		class="btn md:px-6 text-xs md:text-base text-neutral-content capitalize leading-snug tracking-tight bg-neutral border-solid border-neutral"
	>
		Show FCC Test Suite
	</button>
</div>
