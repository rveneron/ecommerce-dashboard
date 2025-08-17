import i18n, { InitOptions } from 'i18next';

import * as ES from 'locales/es';

const resources = {
  es: ES,
};

let lng = localStorage.getItem('i18nextLng');
if (!lng) {
  lng = 'es';
  localStorage.setItem('i18nextLng', lng);
}

const options: InitOptions = {
  interpolation: {
    escapeValue: false,
  },
  lng,
  resources,

  fallbackLng: lng,

  ns: ['common'],

  defaultNS: 'common',

  react: {
    bindI18n: 'languageChanged',
    bindI18nStore: '',
    transEmptyNodeValue: '',
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    useSuspense: true,
  },
};

i18n.on('languageChanged', function (lng) {
  localStorage.setItem('i18nextLng', lng);
  document.documentElement.lang = lng;
});

if (!i18n.isInitialized) {
  i18n.init(options).then();
}

export default i18n;
