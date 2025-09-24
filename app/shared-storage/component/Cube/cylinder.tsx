import { generateSimilarColors } from '@/app/shared-storage/utils/color'
import { Flex } from 'antd'
import React, { useRef } from 'react'
import { useWrapperSize } from './hooks/wrapper'

type CylinderTextType = {
  visible?: boolean
  style?: React.SVGAttributes<Text>
  offset?: { x?: number; y?: number }
}

interface IProps {
  width: number | string
  height: number | string
  percent?: number
  color?: string | string[]
  text?: CylinderTextType
  style?: React.CSSProperties
  ghost?: boolean
  label?: string
  backgroundColor?: string
  labelStyle?: React.CSSProperties
  hiddenText?: boolean
  replacePercentText?: string
}

export default function Cylinder({
  width: cssWidth,
  height: cssHeight,
  percent: p = 100,
  color = '#0181fd',
  backgroundColor = '#EAF1FF',
  text = { visible: true, style: {} },
  ghost,
  style = {},
  label,
  labelStyle = {},
  hiddenText = false,
  replacePercentText = '',
}: IProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [w, h] = useWrapperSize(ref, cssWidth, cssHeight)

  // 椭圆横向半径
  const rx = w * 0.5
  // 椭圆纵向半径
  const ry = rx / 4.5
  // 顶部椭圆圆心
  const tc = { x: rx, y: ry }
  // column 椭圆圆心
  const pc = { x: rx, y: ((100 - p) / 100) * (h - ry * 2) + ry }

  // top left point
  const tlp = { x: 0, y: ry }
  // top right point
  const trp = { x: w, y: ry }
  // bottom left point
  const blp = { x: 0, y: h - ry }
  // 圆柱边长
  const side = h - ry * 2

  // column top left point
  const col_tlp = { x: 0, y: pc.y }
  // column side length
  const col_side = (p / 100) * side

  const po = (point: { x: number; y: number }) => `${point.x} ${point.y}`

  let colors: string[]
  if (Array.isArray(color)) {
    colors = color
  } else {
    const similarColors = generateSimilarColors(color)
    colors = [similarColors[0], color, similarColors[1]]
  }

  const styleId = `style-gradient-${colors[0]}-${colors[1]}`.replaceAll('#', '')

  const textVisible =
    (text.visible === true || text.visible === undefined) && !ghost && p !== 0
  const percentColumnVisible = !ghost && p !== 0
  const textStyle: React.SVGAttributes<Text> = { fontSize: 16, ...text.style }
  const textOffset = { x: text.offset?.x ?? 0, y: text.offset?.y ?? 0 }

  return (
    <Flex vertical align="center" gap={4}>
      {label && <div style={{ ...labelStyle }}>{label}</div>}
      <div style={{ ...style, width: cssWidth, height: cssHeight }} ref={ref}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="100%"
        >
          <defs>
            <linearGradient id={styleId} x1="20%" x2="34%" y1="82%" y2="34%">
              <stop offset="0%" stopColor={colors[1]}></stop>
              <stop offset="100%" stopColor={colors[2]}></stop>
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            {/** 顶部椭圆 */}
            {!ghost && (
              <ellipse
                cx={tc.x}
                cy={tc.y}
                fill={colors[0]}
                fillOpacity=".3"
                rx={rx}
                ry={ry}
              />
            )}
            <path
              fill={backgroundColor}
              fillOpacity=".5"
              d={`m${po(tlp)}
            A${rx},${ry} 0 0 1 ${trp.x},${trp.y}
          v${side}
            A${rx},${ry} 0 0 1 ${blp.x},${blp.y}
          z`}
            ></path>
            {percentColumnVisible && (
              <path
                fill={`url(#${styleId})`}
                d={`m${po(col_tlp)}
              h${w}
              v${col_side}
              A${rx},${ry} 0 0 1 ${blp.x},${blp.y}
              z
              `}
              />
            )}
            {/** column 椭圆 */}
            {!ghost && (
              <ellipse
                cx={pc.x}
                cy={pc.y}
                fill={p == 0 ? colors[0] : colors[1]}
                fillOpacity={p === 0 ? '.075' : 1}
                rx={rx}
                ry={ry}
              />
            )}
          </g>
          {textVisible && !hiddenText && (
            <text
              x={pc.x + textOffset.x}
              // y={pc.y + textOffset.y}
              y={h / 2 + textOffset.y}
              textAnchor="middle"
              style={{ ...textStyle }}
            >
              {replacePercentText || `${Math.round(p)}%`}
            </text>
          )}
        </svg>
      </div>
    </Flex>
  )
}
