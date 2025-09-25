import Rectangular from '@/app/shared-storage/component/Cube/rectangular'
import Cylinder from '@/app/shared-storage/component/Cube/cylinder'
import React, { useRef } from 'react'
import { useSize } from '@/app/shared-storage/component/Storage/hooks/size'
// 移除国际化依赖，使用固定中文文本
const isEnglish = () => false

interface IProps {
  percent?: number
  color?: string
  backgroundColor?: string
}

export const StorageCube = ({
  percent = 0,
  color,
  backgroundColor,
}: IProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { height, width } = useSize('oinstance', 'core', containerRef)

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <Cylinder
        width={width * 1.5}
        height={height * 1}
        percent={percent}
        color={color || '#cb933e'}
        backgroundColor={backgroundColor || '#f5e3c7'}
        text={{
          style: {
            fill: '#fff',
            fontSize: isEnglish() ? 10 : 12,
          },
          offset: { x: 0, y: 10 },
        }}
        replacePercentText="存储"
      />

      <div style={{ fontSize: 10 }}>{percent}T</div>
    </div>
  )
}

export const CalculateStorageCube = ({
  percent,
  color,
  backgroundColor,
}: IProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { height, width } = useSize('oinstance', 'core', containerRef)

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,
        height: '100%',
      }}
    >
      <div style={{ fontSize: 10 }}>1 vCPU</div>
      <Rectangular
        width={width * 1.5}
        height={height * 1}
        percent={percent}
        color={color || '#cb933e'}
        backgroundColor={backgroundColor || '#f9e6b7'}
        text={{
          style: { fill: '#fff', fontSize: isEnglish() ? 10 : 14 },
        }}
        replacePercentText="计算"
      />
    </div>
  )
}
