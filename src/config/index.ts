const SITE = {
  title: 'Vin Yap',
  description: 'Personal portfolio website.',
  url: 'https://vinyap.com',
  image: 'https://example.com/image.png',
  defaultLanguage: 'en',
  languages: ['en', 'ja'],
  defaultLocale: 'en_US',
  locales: ['en_US', 'ja_JP']
};

const OPEN_GRAPH = {
  title: 'Vin Yap',
  description: 'Personal portfolio website.',
  url: 'https://vinyap.com',
  image: { src: 'https://example.com/image.png', alt: 'example' },
  locale: 'en_US'
};

const KNOWN_LANGUAGES = {
  English: 'en',
  Japanese: 'ja'
};

const NAVIGATION = {
  en: [
    {
      label: 'Home',
      path: '/'
    },
    {
      label: 'Projects',
      path: '#projects'
    },
    {
      label: 'Skills',
      path: '#skills'
    }
  ],
  ja: [
    {
      label: 'ホーム',
      path: '/'
    },
    {
      label: 'プロジェクト',
      path: '#projects'
    },
    {
      label: 'スキル',
      path: '#skills'
    }
  ]
};

const SOCIAL_MEDIA_LINKS = {
  github: 'https://github.com/vineryap',
  freeCodeCamp: 'https://freecodecamp.org/vineryap'
};

const EMAIL = 'vineryap@vinyap.com';

export { SITE, OPEN_GRAPH, KNOWN_LANGUAGES, NAVIGATION, SOCIAL_MEDIA_LINKS, EMAIL };
