import i18n from 'i18next'

import { initReactI18next } from 'react-i18next'
import HOME_EN from '../Locales/en/home.json'
import PRODUCT_EN from '../Locales/en/product.json'
import HOME_VI from '../Locales/vi/home.json'
import PRODUCT_VI from '../Locales/vi/product.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const 

export const resources = {
  en: {
    // gọi là namespace
    home: HOME_EN,
    product: PRODUCT_EN
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI
  }
}
export  const defaultNS='home' // không có chuyền namespce vào thì nó  sẽ lấy namespacedefaut
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vi', // ngôn ngữ mặc định
    ns:['home','product'],

    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: 'vi', // không xác định được ngôn ngữ gì thì để luôn là việt nam
    defaultNS,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

// export default i18n
