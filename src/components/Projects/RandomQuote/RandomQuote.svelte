<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { fetchQuotes } from './quotes.js';

	let quotes,
		theQuote,
		theAuthor,
		isHidden = true,
		image,
		canFetchImage = true;

	function getRandomIndex(array) {
		return Math.floor(Math.random() * array.length);
	}

	function getRandomQuote() {
		const { quote, author } = quotes[getRandomIndex(quotes)];
		theQuote = quote.trim();
		theAuthor = author.trim().replace(/[^a-zA-Z. ]/, '');
	}

	async function fetchImage() {
		let res = await fetch(`${import.meta.env.SNOWPACK_PUBLIC_UNSPLASH_API}/1920x1080/?nature`);

		if (res.url.includes('https://images.unsplash.com/source-404')) {
			res = fetchImage();
		}
		return res;
	}

	async function getRandomImage() {
		const res = await fetchImage();

		if (res.ok) {
			const { url } = res;

			image = {
				imageUrl: url.replace(/&h=\d+/, '').replace(/fit=\w+/, 'fit=max'),
				srcset: `${url
					.replace(/&h=\d+/, '')
					.replace(/fit=\w+/, 'fit=max')
					.replace(/w=\d+/, 'w=320')} 320w,
    ${url
			.replace(/&h=\d+/, '')
			.replace(/fit=\w+/, 'fit=max')
			.replace(/w=\d+/, 'w=640')} 640w,
    ${url
			.replace(/&h=\d+/, '')
			.replace(/fit=\w+/, 'fit=max')
			.replace(/w=\d+/, 'w=960')} 960w,
    ${url
			.replace(/&h=\d+/, '')
			.replace(/fit=\w+/, 'fit=max')
			.replace(/w=\d+/, 'w=1280')} 1280w,
    ${url
			.replace(/&h=\d+/, '')
			.replace(/fit=\w+/, 'fit=max')
			.replace(/w=\d+/, 'w=1920')} 1920w`
			};
		}
	}

	async function getQuote() {
		if (!quotes) {
			quotes = await fetchQuotes();
		}

		getRandomQuote();
		if (canFetchImage) {
			await getRandomImage();
		}
	}

	function handleImageLoad() {
		canFetchImage = false;

		setTimeout(() => {
			canFetchImage = true;
		}, 1000);
	}

	function handleShareMenu() {
		isHidden = !isHidden;
	}

	onMount(() => {
		getQuote();
	});
</script>

<div id="quote-box" class="w-full overflow-hidden p-5 lg:mx-10 rounded-3xl">
	<div
		class="w-full h-[450px] md:h-[650px] 2xl:h-[750px] relative p-5 2xl:py-5 2xl:px-36 bg-base-300 items-center box-border rounded-3xl shadow-xl"
	>
		<div class="w-full overflow-hidden">
			{#if image}
				{#key image.imageUrl}
					<img
						on:load={handleImageLoad}
						transition:fade
						id="background"
						class="w-full h-full absolute inset-0 object-cover object-center rounded-3xl"
						sizes="(min-width: 2560px) 2560px"
						srcset={image.srcset}
						src={image.imageUrl}
						alt="Photograph from unsplash.com"
					/>
				{/key}
				<div
					class="w-full h-full absolute inset-0 bg-black opacity-20 transition-opacity duration-500 rounded-3xl"
				/>
			{/if}
		</div>
		<div class="w-full h-full text-center text-white z-10">
			<div class="flex flex-col justify-center items-center w-full h-full">
				{#if theQuote}
					{#key theQuote}
						<q
							in:fade={{ delay: 0, duration: 500 }}
							id="text"
							class="w-full 2xl:leading-[3.5rem] text-xl md:text-4xl 2xl:text-5xl font-medium mb-2 clear-both filter drop-shadow transition-all duration-500"
						>
							{theQuote}
						</q>
					{/key}
					{#key theAuthor}
						<h2
							in:fade={{ delay: 0, duration: 500 }}
							id="author"
							class="w-full mt-6 md:text-xl font-medium tracking-wider clear-both filter drop-shadow before:content-['-'] before:mr-1 transition-all duration-500 text-right"
						>
							{theAuthor}
						</h2>
					{/key}
				{:else}
					<p
						in:fade={{ delay: 0, duration: 500 }}
						id="text"
						class="loading w-full leading-relaxed text-xl md:text-5xl font-medium  mb-2 clear-both filter drop-shadow transition-all duration-500"
					>
						Getting your quote
					</p>
				{/if}
			</div>

			<div class="absolute bottom-4 left-4 flex flex-wrap items-center">
				<button
					on:click={handleShareMenu}
					type="button"
					class="self-end btn btn-circle btn-ghost bg-white bg-opacity-50 hover:bg-white focus:bg-white"
				>
					<img
						src="https://api.iconify.design/ion:share-social.svg"
						class="h-6 w-6 transition-all"
						alt="Share to social media"
					/>
				</button>

				<div
					class="transition-all ml-4 {isHidden
						? 'opacity-0 h-0'
						: 'opacity-100 h-full'} overflow-hidden z-10"
				>
					<div
						class="flex flex-col w-full bg-white text-gray-900 px-8 py-4 rounded-3xl gap-2 transition-all"
					>
						<p class=" font-semibold tracking-wider">Share to Social Media</p>
						<hr class="w-full mb-2 bg-gray-800" />
						<a
							href="https://twitter.com/intent/tweet?text={encodeURIComponent(
								`${theQuote}\n- ${theAuthor}`
							)}"
							target="_blank"
							rel="external"
							id="tweet-quote"
							class="inline-flex hover:bg-gray-900 px-3 py-1 rounded gap-2 transition-all capitalize group"
						>
							<img
								src="https://api.iconify.design/fa:twitter-square.svg"
								class="h-6 w-6 transition-all"
								alt="Twitter logo"
							/>
							twitter
						</a>
						<a
							href="https://tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption={encodeURIComponent(
								theAuthor
							)}&content={encodeURIComponent(theQuote)}"
							target="_blank"
							rel="external"
							id="share-quote-to-facebook"
							class="inline-flex hover:bg-gray-900 px-3 py-1 rounded gap-2 transition-all capitalize group"
						>
							<img
								src="https://api.iconify.design/fa:tumblr-square.svg"
								class="h-6 w-6 transition-all"
								alt="Tumblr logo"
							/>
							Tumblr
						</a>
					</div>
				</div>
			</div>

			<div id="unsplash-credit" class="absolute bottom-4 right-4 flex items-center gap-4">
				<a
					id="credits"
					href="https://unsplash.com"
					target="_blank"
					rel="external"
					class="capitalize transition-opacity duration-1000">Unsplash</a
				>
			</div>
		</div>
	</div>
	<div class="mt-10 transition-all duration-500 mx-auto">
		<div class="flex items-center place-content-center w-full h-full p-2 mt-4">
			<button on:click={() => getQuote()} id="new-quote" class="btn btn-primary">Next Quote</button>
		</div>
	</div>
</div>

<style>
	.loading:after {
		content: ' .';
		animation: dots 1s steps(5, end) infinite;
	}

	@keyframes dots {
		0%,
		20% {
			color: rgba(0, 0, 0, 0);
			text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
		}
		40% {
			color: white;
			text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
		}
		60% {
			text-shadow: 0.25em 0 0 white, 0.5em 0 0 rgba(0, 0, 0, 0);
		}
		80%,
		100% {
			text-shadow: 0.25em 0 0 white, 0.5em 0 0 white;
		}
	}
</style>
