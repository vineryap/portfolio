<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { cubicIn, cubicOut } from 'svelte/easing';

  export let quotes;
  let theQuote;
  let theAuthor;

  function getRandomInt(array) {
    return Math.floor(Math.random() * array.length);
  }

  function getRandomQuote() {
    const { quote, author } = quotes[getRandomInt(quotes)];
    theQuote = quote.trim();
    theAuthor = author.trim();
  }

  function getQuote() {
    getRandomQuote();
  }

  onMount(() => {
    getRandomQuote();
  });
</script>

<div class="m-10 h-96">
  <div class="flex flex-col justify-between">
    {#if theQuote}
      {#key theQuote}
        <q
          in:fade={{ delay: 300, duration: 300, easing: cubicIn }}
          out:fade={{ duration: 0, easing: cubicOut }}
          id="text"
          class="leading-relaxed text-xl"
        >
          {theQuote}
        </q>
      {/key}
      {#key theAuthor}
        <h2
          in:fade={{ delay: 300, duration: 300, easing: cubicIn }}
          out:fade={{ duration: 0, easing: cubicOut }}
          id="author"
          class="mt-6 text-lg font-medium title-font tracking-wider text-sm self-end"
        >
          {theAuthor}
        </h2>
      {/key}
    {/if}
  </div>
</div>
<div class="flex flex-col items-center">
  <span class="inline-flex gap-4">
    <!-- facebook -->
    <a id="fb-quote" class="text-gray-500">
      <svg
        fill="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        class="w-5 h-5"
        viewBox="0 0 24 24"
      >
        <path
          d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
        />
      </svg>
    </a>
    <!-- twitter -->
    <a
      href="https://twitter.com/intent/tweet?text={encodeURIComponent(
        `${theQuote}\n- ${theAuthor}`
      )}"
      target="_blank"
      id="tweet-quote"
      class="text-gray-500"
    >
      <svg
        fill="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        class="w-5 h-5"
        viewBox="0 0 24 24"
      >
        <path
          d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
        />
      </svg>
    </a>
  </span>
  <div class="mt-4 w-full">
    <button
      on:click={() => getQuote()}
      id="new-quote"
      class="flex mx-auto transition-all text-blue-500 border-2 border-blue-500 py-2 px-8 focus:outline-none hover:bg-blue-600 hover:text-white hover:border-transparent rounded text-lg"
      >Button</button
    >
  </div>
</div>