<template>
  <div
    class="
      w-full
      h-full
      flex flex-col
      justify-center
      mx-auto
      p-5
      md:p-0 md:my-20 md:max-w-screen-sm
      lg:max-w-screen-2xl
    "
  >
    <div
      class="
        h-[26rem]
        md:h-[700px]
        border border-base-200
        mockup-window
        bg-base-300
      "
    >
      <div
        class="
          w-full
          h-full
          p-4
          pt-0
          md:p-8
          bg-white
          overflow-x-hidden overflow-y-auto
        "
      >
        <div id="preview"></div>
      </div>
    </div>
    <div class="form-control mt-6">
      <label
        class="font-bold uppercase tracking-wider leading-loose"
        for="editor"
        >Editor</label
      >

      <textarea
        id="editor"
        class="
          textarea textarea-bordered
          w-full
          h-56
          text-base
          overflow-x-hidden overflow-y-scroll
          shadow-md
        "
        placeholder="# Enter your markdown!"
        v-model="input"
        @keyup="handleKeyup"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { parseMarkdown, getInitialContent } from './helpers'

export default {
  setup() {
    const initialContent = getInitialContent(' + Vue.js')

    const input = ref(initialContent)
    // const html = ref(parseMarkdown(input.value));

    const handleKeyup = () => {
      // html.value = parseMarkdown(input.value);
      document.getElementById('preview').innerHTML = parseMarkdown(input.value)
    }
    onMounted(() => {
      // html.value = parseMarkdown(initialContent);
      document.getElementById('preview').innerHTML =
        parseMarkdown(initialContent)
    })

    return {
      input,
      handleKeyup
    }
  }
}
</script>
