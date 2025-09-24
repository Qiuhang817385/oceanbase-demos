import { generateSimilarColors } from '@/app/shared-storage/utils/color'
import { Flex } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useWrapperSize } from './hooks/wrapper'

type RectangularTextType = {
  visible?: boolean
  style?: React.SVGAttributes<SVGTextElement>
  offset?: { x?: number; y?: number }
}

interface IProps {
  width: number | string
  height: number | string
  percent?: number
  color?: string | string[]
  text?: RectangularTextType
  style?: React.CSSProperties
  ghost?: boolean
  label?: string
  backgroundColor?: string
  labelStyle?: React.CSSProperties
  hiddenText?: boolean
  replacePercentText?: string
}

export default function Rectangular({
  width: cssWidth,
  height: cssHeight,
  percent: p = 100,
  color = '#0181fd',
  backgroundColor = '#fbf2e1',
  text = { visible: true, style: {} },
  replacePercentText = '',
  ghost,
  style = {},
  label,
  labelStyle = {},
  hiddenText = false,
}: IProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [w, h] = useWrapperSize(ref, cssWidth, cssHeight)

  // percent 动画状态
  const [displayPercent, setDisplayPercent] = useState(0)
  useEffect(() => {
    let start: number | null = null
    const duration = 800
    const from = displayPercent
    const to = p
    const diff = to - from
    function ease(t: number) {
      // easeInOutCubic
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }
    function step(ts: number) {
      if (start === null) start = ts
      const elapsed = ts - start
      const percent = Math.min(elapsed / duration, 1)
      const eased = ease(percent)
      setDisplayPercent(from + diff * eased)
      if (percent < 1) {
        requestAnimationFrame(step)
      } else {
        setDisplayPercent(to)
      }
    }
    requestAnimationFrame(step)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p])

  // 颜色处理
  let colors: string[]
  if (Array.isArray(color)) {
    colors = color
  } else {
    const similarColors = generateSimilarColors(color)
    colors = [similarColors[0], color, similarColors[1]]
  }
  const styleId = `rect-gradient-${colors[0]}-${colors[1]}`.replaceAll('#', '')

  // 文本显示
  const textVisible =
    (text.visible === true || text.visible === undefined) && !ghost && p !== 0
  const percentColumnVisible = !ghost && p !== 0
  const textStyle: React.SVGAttributes<SVGTextElement> = {
    fontSize: 16,
    ...text.style,
  }
  const textOffset = { x: text.offset?.x ?? 0, y: text.offset?.y ?? 0 }

  // 进度条高度
  const percentHeight = (displayPercent / 100) * h

  // 立体深度 - 增强透视效果
  const depth = Math.min(w, h) * 0.4 // 增加深度以增强立体效果

  // 等轴测投影 - 调整角度以增强透视
  const angle = Math.PI / 5 // 36度角，增强透视效果

  // 计算等轴测投影的偏移
  const offsetX = depth * Math.cos(angle)
  const offsetY = depth * Math.sin(angle)

  // 调整容器尺寸以适应立体效果
  const adjustedWidth = w + offsetX
  const adjustedHeight = h + offsetY

  // 完整长方体的顶点 - 确保上顶面和底面平行
  // A:左下前, B:右下前, C:右上前, D:左上前
  // E:左下后, F:右下后, G:右上后, H:左上后
  const A = { x: 0, y: adjustedHeight }
  const B = { x: w, y: adjustedHeight }
  const C = { x: w, y: adjustedHeight - h }
  const D = { x: 0, y: adjustedHeight - h }

  const E = { x: offsetX, y: adjustedHeight - offsetY }
  const F = { x: w + offsetX, y: adjustedHeight - offsetY }
  const G = { x: w + offsetX, y: adjustedHeight - offsetY - h }
  const H = { x: offsetX, y: adjustedHeight - offsetY - h }

  // 进度填充的顶点 - 从底部开始填充到进度高度
  const fillA = { x: 0, y: adjustedHeight }
  const fillB = { x: w, y: adjustedHeight }
  const fillC = { x: w, y: adjustedHeight - percentHeight }
  const fillD = { x: 0, y: adjustedHeight - percentHeight }

  // 进度填充的右侧面顶点
  const fillRightA = { x: w, y: adjustedHeight }
  const fillRightB = { x: w + offsetX, y: adjustedHeight - offsetY }
  const fillRightC = {
    x: w + offsetX,
    y: adjustedHeight - offsetY - percentHeight,
  }
  const fillRightD = { x: w, y: adjustedHeight - percentHeight }

  // 进度填充的顶面顶点
  const fillTopA = { x: 0, y: adjustedHeight - percentHeight }
  const fillTopB = { x: w, y: adjustedHeight - percentHeight }
  const fillTopC = {
    x: w + offsetX,
    y: adjustedHeight - offsetY - percentHeight,
  }
  const fillTopD = { x: offsetX, y: adjustedHeight - offsetY - percentHeight }

  // 进度填充的左侧面顶点
  const fillLeftA = { x: 0, y: adjustedHeight }
  const fillLeftB = { x: offsetX, y: adjustedHeight - offsetY }
  const fillLeftC = { x: offsetX, y: adjustedHeight - offsetY - percentHeight }
  const fillLeftD = { x: 0, y: adjustedHeight - percentHeight }

  // SVG 路径生成
  const path = (pts: { x: number; y: number }[]) =>
    pts.map((p) => `${p.x},${p.y}`).join(' ')

  return (
    <Flex vertical align="center" gap={4}>
      {label && <div style={{ ...labelStyle }}>{label}</div>}
      <div style={{ ...style, width: cssWidth, height: cssHeight }} ref={ref}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${adjustedWidth} ${adjustedHeight}`}
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="100%"
        >
          <defs>
            <linearGradient id={styleId} x1="0%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stopColor={colors[1]}></stop>
              <stop offset="100%" stopColor={colors[2]}></stop>
            </linearGradient>

            {/* 进度填充的阴影渐变 */}
            <linearGradient
              id={`${styleId}-shadow`}
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor={colors[1]} stopOpacity="0.8"></stop>
              <stop offset="100%" stopColor={colors[1]} stopOpacity="1"></stop>
            </linearGradient>

            {/* 进度填充的顶面渐变 */}
            <linearGradient
              id={`${styleId}-top`}
              x1="0%"
              x2="0%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={colors[2]} stopOpacity="0.9"></stop>
              <stop
                offset="100%"
                stopColor={colors[1]}
                stopOpacity="0.7"
              ></stop>
            </linearGradient>
          </defs>

          {/* 完整长方体的后面（底面）- 最底层 */}
          <polygon
            points={path([E, F, G, H])}
            fill={backgroundColor}
            fillOpacity={0.3}
          />

          {/* 完整长方体的左侧面 - 第二层 */}
          <polygon
            points={path([A, D, H, E])}
            fill={backgroundColor}
            fillOpacity={0.4}
          />

          {/* 完整长方体的右侧面 - 第三层 */}
          <polygon
            points={path([B, F, G, C])}
            fill={backgroundColor}
            fillOpacity={0.25}
          />

          {/* 完整长方体的顶面 - 第四层 */}
          <polygon
            points={path([D, C, G, H])}
            fill={backgroundColor}
            fillOpacity={1}
          />

          {/* 进度填充的左侧面 - 第五层（阴影效果） */}
          {percentColumnVisible && (
            <polygon
              points={path([fillLeftA, fillLeftB, fillLeftC, fillLeftD])}
              fill={`url(#${styleId}-shadow)`}
            />
          )}

          {/* 进度填充的右侧面 - 第六层（阴影效果） */}
          {percentColumnVisible && (
            <polygon
              points={path([fillRightA, fillRightB, fillRightC, fillRightD])}
              fill={`url(#${styleId}-shadow)`}
            />
          )}

          {/* 进度填充的顶面 - 第七层（纯色） */}
          {percentColumnVisible && (
            <polygon
              points={path([fillTopA, fillTopB, fillTopC, fillTopD])}
              fill={colors[1]}
              fillOpacity={1}
            />
          )}

          {/* 进度填充的前面 - 第八层（主渐变） */}
          {percentColumnVisible && (
            <polygon
              points={path([fillA, fillB, fillC, fillD])}
              fill={`url(#${styleId})`}
            />
          )}

          {/* 添加内部阴影效果 */}
          {percentColumnVisible && (
            <polygon
              points={path([fillA, fillB, fillC, fillD])}
              fill="none"
              stroke={colors[2]}
              strokeWidth={1}
              strokeOpacity={0.3}
            />
          )}

          {/* 百分比文本 */}
          {textVisible && !hiddenText && (
            <text
              x={w / 2 + textOffset.x}
              y={adjustedHeight - percentHeight / 2 + textOffset.y}
              textAnchor="middle"
              style={textStyle as React.CSSProperties}
              alignmentBaseline="middle"
              fill={colors[1]}
              fontWeight="bold"
              // fontSize={Math.max(12, Math.min(24, percentHeight / 3))}
            >
              {replacePercentText || `${Math.round(displayPercent)}%`}
            </text>
          )}
        </svg>
      </div>
    </Flex>
  )
}
