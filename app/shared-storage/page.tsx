'use client'
import Main from '@/app/shared-storage/component/Main/index'
import Overview from '@/app/shared-storage/component/Overview/index'
import { Tabs } from 'antd'
import { useState, useRef, useEffect } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview')
  const [elementWidth, setElementWidth] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

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
                      大存储业务场景降本
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
                      扩缩容提速
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
