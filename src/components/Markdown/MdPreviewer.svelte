<script lang="ts">
  import { initialContent as initial, parseMarkdown } from './mdhelpers';

  let input: string = initial;
</script>

<div class="w-full h-full p-10 card bg-base-200 rounded-none">
  <div class="alert alert-warning mb-6">
    <div class="flex-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="w-6 h-6 mx-2 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span
        >freeCodeCamp test script supported technologies: HTML, JavaScript, CSS,
        Bootstrap, SASS, React, Redux, and jQuery.</span
      >
    </div>
  </div>

  <div class="border mockup-window border-base-300">
    <div class="h-full p-8 border-t border-base-300 bg-white overflow-y-auto">
      <div id="preview">
        {@html parseMarkdown(input)}
      </div>
    </div>
  </div>
  <div class="form-control mt-6">
    <label class="font-bold text-gray-500 uppercase tracking-wider" for="editor"
      >Editor</label
    >
    <textarea
      id="editor"
      class="textarea h-56 focus:textarea-info shadow"
      placeholder="# Enter your markdown!"
      bind:value={input}
    />
  </div>
</div>
