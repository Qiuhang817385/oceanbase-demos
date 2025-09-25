'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// 直接导入翻译资源，避免 HTTP 请求
import zhCN from '../../public/locales/zh-CN/translation.json'
import enUS from '../../public/locales/en-US/translation.json'

const supportedLngs = ['zh-CN', 'en-US']
const fallbackLng = 'zh-CN'

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      supportedLngs,
      fallbackLng,
      debug: process.env.NODE_ENV === 'development',

      // 使用预加载的资源
      resources: {
        'zh-CN': {
          translation: zhCN,
        },
        'en-US': {
          translation: enUS,
        },
      },

      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
      },

      interpolation: {
        escapeValue: false,
      },
    })
}

export default i18n
