export const navigationConfig = {
  mainNav: [
    { href: '/', label: 'nav.home' },
    { href: '/csv-to-json', label: 'nav.csv-to-json' },
    { href: '/blog', label: 'nav.blog' }
  ]
} as const;

export const languageConfig = [
  { 
    code: 'en', 
    label: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  { 
    code: 'zh', 
    label: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳'
  }
] as const;