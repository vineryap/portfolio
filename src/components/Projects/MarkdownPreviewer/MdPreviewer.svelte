<script lang="ts">
	import { onMount } from 'svelte';
	import { parseMarkdown, getInitialContent } from './helpers';

	let input: string = getInitialContent(' + Svelte');

	// let html = parseMarkdown(input);

	// if we bind the html to the dom it will fail the freeCodeCamp tester script. 🤷🏻‍♂️

	const handleKeyup = () => {
		// html = parseMarkdown(input);
		document.getElementById('preview').innerHTML = `${parseMarkdown(input)}`;
	};

	onMount(() => {
		document.getElementById('preview').innerHTML = `${parseMarkdown(input)}`;
	});
</script>

<div class="w-full h-full flex flex-col justify-center mx-auto mt-10 mb-20">
	<div class="h-[26rem] md:h-[700px] border mockup-window bg-base-300 border-base-200">
		<div
			class="w-full h-full p-4 pt-0 md:p-8 border-t border-base-200 bg-white overflow-x-hidden overflow-y-auto"
		>
			<div id="preview">
				<!-- for the sake of freeCodeCamp tester script, {@html html} unusable -->
			</div>
		</div>
	</div>
	<div class="form-control mt-6">
		<label class="font-bold uppercase tracking-wider leading-loose" for="editor">Editor</label>
		<textarea
			id="editor"
			class="textarea textarea-bordered bg-white w-full h-56 text-base overflow-x-hidden overflow-y-scroll shadow-md"
			placeholder="# Enter your markdown!"
			bind:value={input}
			on:keyup={handleKeyup}
		/>
	</div>
</div>
