'use client'

import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useState, useEffect } from 'react'
import '@/lib/i18n/client-init'

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const router = useRouter()
  const { t, i18n } = useTranslation('translation')
  const [locale, setLocale] = useState<string>('zh-CN')

  // 获取 locale 参数
  useEffect(() => {
    params.then(({ locale: paramLocale }) => {
      setLocale(paramLocale)
      if (i18n.language !== paramLocale) {
        i18n.changeLanguage(paramLocale)
      }
    })
  }, [params, i18n])

  const cards = [
    {
      id: 'materialized-view',
      title: t('home.cards.materializedView.title'),
      description: t('home.cards.materializedView.description'),
      bgColor: 'bg-gradient-to-br from-blue-500 to-purple-600',
      hoverColor: 'hover:from-blue-600 hover:to-purple-700',
      icon: '📊',
    },
    {
      id: 'shared-storage',
      title: t('home.cards.sharedStorage.title'),
      description: t('home.cards.sharedStorage.description'),
      bgColor: 'bg-gradient-to-br from-green-500 to-teal-600',
      hoverColor: 'hover:from-green-600 hover:to-teal-700',
      icon: '💾',
    },
  ]

  const handleCardClick = (routeId: string) => {
    router.push(`/${routeId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f9ff] via-[#f5f9ff] to-[#f8fbff00] p-8">
      <div className="flex justify-end">
        <LanguageSwitcher />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t('app.title')}
          </h1>
          <p className="text-lg text-gray-600">{t('app.description')}</p>
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
                <span className="text-sm">{t('actions.clickToEnter')}</span>
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
