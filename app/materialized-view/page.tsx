'use client'

import Main from '@/app/materialized-view/component/Main/index'
import { GoogleAnalytics } from '@next/third-parties/google'
import { useEffect, useState } from 'react'

export default function Home() {
  const [language, setLanguage] = useState('zh-CN')

  useEffect(() => {
    // 在客户端获取 URL 参数
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const urlLanguage = urlParams.get('language') || 'zh-CN'
      setLanguage(urlLanguage)
    }
  }, [])

  return (
    <div className="w-full bg-gradient-to-b from-[#f5f9ff] via-[#f5f9ff] to-[#f8fbff00] border border-solid border-[#e2e8f3] rounded-md p-4">
      <Main />
      <GoogleAnalytics gaId="G-9F380MRK1S" />
    </div>
  )
}
