import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const locales = ['zh-CN', 'en-US']

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  // 简化的元数据生成
  const titles = {
    'zh-CN': 'OceanBase 功能演示',
    'en-US': 'OceanBase Feature Demo',
  }

  const descriptions = {
    'zh-CN': '选择下面的功能模块开始体验',
    'en-US': 'Select a feature module below to start exploring',
  }

  return {
    title: titles[locale as keyof typeof titles] || titles['zh-CN'],
    description:
      descriptions[locale as keyof typeof descriptions] ||
      descriptions['zh-CN'],
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // 验证语言代码
  if (!locales.includes(locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
