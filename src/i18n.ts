import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import HttpBackend from 'i18next-http-backend';

i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        debug: false,
        lng: 'it',
        fallbackLng: 'it',
        supportedLngs: ['it', 'en'],
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
    });

export default i18n;
