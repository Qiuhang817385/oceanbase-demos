import Rectangular from '@/app/shared-storage/component/Cube/rectangular'
import Cylinder from '@/app/shared-storage/component/Cube/cylinder'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSize } from '@/app/shared-storage/component/Storage/hooks/size'
import '@/lib/i18n/client-init'

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
  const { t } = useTranslation('translation')
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
            fontSize: t('language.english') === 'English' ? 10 : 12,
          },
          offset: { x: 0, y: 10 },
        }}
        replacePercentText={t('sharedStorage.architecture.storage')}
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
  const { t } = useTranslation('translation')
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
          style: {
            fill: '#fff',
            fontSize: t('language.english') === 'English' ? 10 : 14,
          },
        }}
        replacePercentText={t('sharedStorage.architecture.calculate')}
      />
    </div>
  )
}
