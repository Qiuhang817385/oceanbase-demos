'use client'

import Main from '@/app/materialized-view/component/Main/index'
import { GoogleAnalytics } from '@next/third-parties/google'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import '@/lib/i18n/client-init'

export default function MaterializedViewPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { t, i18n } = useTranslation('translation')

  // 同步 URL 中的语言与 i18n 实例
  useEffect(() => {
    params.then(({ locale: paramLocale }) => {
      if (i18n.language !== paramLocale) {
        i18n.changeLanguage(paramLocale)
      }
    })
  }, [params, i18n])

  return (
    <div className="w-full bg-gradient-to-b from-[#f5f9ff] via-[#f5f9ff] to-[#f8fbff00] border border-solid border-[#e2e8f3] rounded-md p-4">
      <Main />
      <GoogleAnalytics gaId="G-9F380MRK1S" />
    </div>
  )
}
