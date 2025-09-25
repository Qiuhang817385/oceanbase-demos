'use client'

import { useRouter } from 'next/navigation'
import { Select } from 'antd'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()

  const cards = [
    {
      id: 'materialized-view',
      title: '物化视图',
      description: 'OceanBase 物化视图功能演示',
      bgColor: 'bg-gradient-to-br from-blue-500 to-purple-600',
      hoverColor: 'hover:from-blue-600 hover:to-purple-700',
      icon: '📊',
    },
    {
      id: 'shared-storage',
      title: '共享存储',
      description: 'OceanBase 共享存储功能演示',
      bgColor: 'bg-gradient-to-br from-green-500 to-teal-600',
      hoverColor: 'hover:from-green-600 hover:to-teal-700',
      icon: '💾',
    },
  ]

  const handleCardClick = (routeId: string) => {
    router.push(`/${routeId}`)
  }

  const [language, setLanguage] = useState(
    window.localStorage.getItem('language') || 'zh-CN'
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f9ff] via-[#f5f9ff] to-[#f8fbff00] p-8">
      <div className="flex justify-end">
        <Select
          value={language}
          onChange={(value) => {
            // window.location.reload()
            window.localStorage.setItem('language', value)
            setLanguage(value)
          }}
          placeholder="请选择语言"
          options={[
            { label: '中文', value: 'zh-CN' },
            { label: '英文', value: 'en-US' },
          ]}
        />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            OceanBase 功能演示
          </h1>
          <p className="text-lg text-gray-600">选择下面的功能模块开始体验</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                ${card.bgColor} ${card.hoverColor}
                cursor-pointer rounded-xl p-8 text-white
                transform transition-all duration-300 ease-in-out
                hover:scale-105 hover:shadow-2xl
                border border-white/20
              `}
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{card.icon}</span>
                <h2 className="text-2xl font-bold">{card.title}</h2>
              </div>
              <p className="text-white/90 text-lg leading-relaxed">
                {card.description}
              </p>
              <div className="mt-6 flex items-center text-white/80">
                <span className="text-sm">点击进入</span>
                <svg
                  className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
