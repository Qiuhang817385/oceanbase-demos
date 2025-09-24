function adjustColor(color: string, amount: number) {
  // 将颜色字符串转换为整数
  let r = parseInt(color.slice(1, 3), 16)
  let g = parseInt(color.slice(3, 5), 16)
  let b = parseInt(color.slice(5, 7), 16)

  // 调整每个颜色分量
  r = Math.max(0, Math.min(255, r + amount))
  g = Math.max(0, Math.min(255, g + amount))
  b = Math.max(0, Math.min(255, b + amount))

  // 将结果格式化回十六进制字符串
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export function generateSimilarColors(hexColor: string) {
  if (hexColor[0] !== '#') {
    throw new Error(
      'Invalid color format. Please provide a valid hex color starting with #.'
    )
  }

  // 生成稍微更暗和更亮的颜色
  const darker = adjustColor(hexColor, -40) // 减少亮度
  const lighter = adjustColor(hexColor, 20) // 增加亮度

  return [lighter, darker]
}
