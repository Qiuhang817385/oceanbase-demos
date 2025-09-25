// 简化的服务端配置，主要用于元数据生成
export default async function initI18next(lng: string, ns: string) {
  // 直接导入翻译文件
  const translations = await import(
    `../../public/locales/${lng}/translation.json`
  )

  // 创建一个简单的翻译函数
  return {
    t: (key: string) => {
      const keys = key.split('.')
      let value = translations.default
      for (const k of keys) {
        value = value?.[k]
      }
      return value || key
    },
  }
}
