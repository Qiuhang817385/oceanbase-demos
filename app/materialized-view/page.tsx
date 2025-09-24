'use client'

import Main from '@/app/materialized-view/component/Main/index'
import { GoogleAnalytics } from '@next/third-parties/google'
import { useEffect } from 'react'
import $i18n from '../../i18n'

export default function Home() {
  const urlParams = new URLSearchParams(window.location.search)
  const language = urlParams.get('language') || 'zh-CN'

  useEffect(() => {
    if (language) {
      $i18n.changeLocale(language)
    }
  }, [language])

  return (
    <div className="w-full bg-gradient-to-b from-[#f5f9ff] via-[#f5f9ff] to-[#f8fbff00] border border-solid border-[#e2e8f3] rounded-md p-4">
      <Main />
      <GoogleAnalytics gaId="G-9F380MRK1S" />
    </div>
  )
}
