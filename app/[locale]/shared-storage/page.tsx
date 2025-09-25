'use client'
import Main from '@/app/shared-storage/component/Main/index'
import Overview from '@/app/shared-storage/component/Overview/index'
import { Tabs } from 'antd'
import { useState, useRef, useEffect } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n/client-init'

export default function SharedStoragePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { t, i18n } = useTranslation('translation')
  const [activeTab, setActiveTab] = useState('overview')
  const [elementWidth, setElementWidth] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

  // 同步 URL 中的语言与 i18n 实例
  useEffect(() => {
    params.then(({ locale: paramLocale }) => {
      if (i18n.language !== paramLocale) {
        i18n.changeLanguage(paramLocale)
      }
    })
  }, [params, i18n])

  // 监听元素宽度变化
  useEffect(() => {
    const updateWidth = () => {
      if (elementRef.current) {
        const width = elementRef.current.offsetWidth
        setElementWidth(width)
      }
    }

    updateWidth() // 初始获取宽度
    window.addEventListener('resize', updateWidth) // 监听窗口大小变化

    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  return (
    <>
      <div className="w-full bg-[#f5f9ff] border border-solid border-[#e2e8f3] rounded-md p-4">
        <div ref={elementRef} className="w-full ">
          <Tabs
            className="w-full"
            centered
            items={[
              {
                label: (
                  <>
                    <div
                      style={{
                        fontSize: 18,
                        width: elementWidth / 2 - 30,
                        fontWeight: 500,
                        textAlign: 'center',
                        ...(activeTab !== 'overview' && {
                          color: '#00000073',
                        }),
                      }}
                    >
                      {t('sharedStorage.tabs.overview')}
                    </div>
                  </>
                ),

                key: 'overview',
              },
              {
                label: (
                  <>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        width: elementWidth / 2 - 30,
                        textAlign: 'center',
                        ...(activeTab !== 'main' && {
                          color: '#00000073',
                        }),
                      }}
                    >
                      {t('sharedStorage.tabs.main')}
                    </div>
                  </>
                ),

                key: 'main',
              },
            ]}
            activeKey={activeTab}
            onChange={setActiveTab}
          />
        </div>
        {activeTab === 'main' && <Main />}
        {activeTab === 'overview' && <Overview />}
      </div>
      <GoogleAnalytics gaId="G-QSQ9BVCX99" />
    </>
  )
}
