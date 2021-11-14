<template>
  <div class="language-select-wrapper">
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 88.6 77.3"
      height="1.2em"
      width="1.2em"
    >
      <path
        fill="currentColor"
        d="M61,24.6h7.9l18.7,51.6h-7.7l-5.4-15.5H54.3l-5.6,15.5h-7.2L61,24.6z M72.6,55l-8-22.8L56.3,55H72.6z"
      />
      <path
        fill="currentColor"
        d="M53.6,60.6c-10-4-16-9-22-14c0,0,1.3,1.3,0,0c-6,5-20,13-20,13l-4-6c8-5,10-6,19-13c-2.1-1.9-12-13-13-19h8          c4,9,10,14,10,14c10-8,10-19,10-19h8c0,0-1,13-12,24l0,0c5,5,10,9,19,13L53.6,60.6z M1.6,16.6h56v-8h-23v-7h-9v7h-24V16.6z"
      />
    </svg>
    <select
      class="language-select"
      :class="className"
      :value="lang"
      @change="onChangeHandler"
    >
      <option
        v-for="options in selectOptions"
        :value="options.value"
        :key="options.value"
      >
        <span :class="lang === 'ja' ? 'ja-font font-semibold' : ''">{{
          options.label
        }}</span>
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import './LanguageSelect.css'
import { KNOWN_LANGUAGES, langPathRegex } from '../../utils/languages'

export default {
  props: {
    lang: {
      type: String,
      default: 'en',
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { lang, className } = props
    const i18n = {
      english: {
        en: {
          label: 'English',
          value: 'en'
        },
        ja: {
          label: '英語',
          value: 'en'
        }
      },
      japanese: {
        en: {
          label: 'Japanese',
          value: 'ja'
        },
        ja: {
          label: '日本語',
          value: 'ja'
        }
      }
    }
    const selectOptions = Object.keys(KNOWN_LANGUAGES).map(key => {
      return {
        value: i18n[key.toLowerCase()][lang].value,
        label: i18n[key.toLowerCase()][lang].label
      }
    })

    const onChangeHandler = e => {
      const newLang = e.target.value
      let actualDest = window.location.pathname.replace(langPathRegex, '/')

      if (actualDest === '/') {
        if (newLang === 'en') {
          return (window.location.pathname = '/')
        }
        return (window.location.pathname = '/' + newLang + '/')
      }

      if (newLang === 'en') {
        return (window.location.pathname = actualDest)
      }

      return (window.location.pathname = '/' + newLang + actualDest)
    }

    return {
      lang,
      className,
      onChangeHandler,
      selectOptions
    }
  }
}
</script>