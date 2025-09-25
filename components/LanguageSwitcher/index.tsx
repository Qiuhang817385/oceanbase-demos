'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Select } from 'antd'
import '@/lib/i18n/client-init'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (locale: string) => {
    // 从当前路径中提取语言代码
    const segments = pathname.split('/')
    segments[1] = locale
    const newPath = segments.join('/')
    router.push(newPath)
  }

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      placeholder="请选择语言"
      options={[
        { label: '中文', value: 'zh-CN' },
        { label: 'English', value: 'en-US' },
      ]}
    />
  )
}
