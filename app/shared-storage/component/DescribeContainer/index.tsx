'use client'
import { useEffect, useRef, useState } from 'react'
import { Button, Col, Row, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import Charts from '@/app/shared-storage/component/Charts'
import { SwapOutlined, SyncOutlined } from '@ant-design/icons'
import '@/lib/i18n/client-init'

export default function DescribeContainer({
  handleExpand,
  handleShrink,
  isUpScene,
  setIsUpScene,
  isPaused,
  setIsPaused,
  setRefreshTag,
  refreshTag,
}: {
  handleExpand: () => void
  handleShrink: () => void
  isUpScene: boolean
  setIsUpScene: (isUpScene: boolean) => void
  isPaused: boolean
  setIsPaused: (isPaused: boolean) => void
  setRefreshTag: (refreshTag: boolean) => void
  refreshTag: boolean
}) {
  const { t } = useTranslation('translation')
  const [currentIndex, setCurrentIndex] = useState(0)

  const [isAtPeak, setIsAtPeak] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setContainerSize({ width, height })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const [buttonDisabled, setButtonDisabled] = useState(false)

  return (
    <div>
      <Row className="mb-4 w-full h-full text-center bg-[#fff] border-[2px] border-solid border-[#0000000f]">
        <Col
          span={2}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f6f8fb',
          }}
        >
          <SyncOutlined
            className="cursor-pointer text-20px"
            style={{
              fontSize: 20,
              color: '#8d8d8d',
            }}
            onClick={() => {
              setRefreshTag((prev) => !prev)
              setButtonDisabled(false)
            }}
          />
        </Col>
        <Col
          span={8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Space
            size={16}
            style={{
              fontSize: t('language.english') === 'English' ? 12 : 16,
              color: '#132039',
            }}
          >
            <div>
              {isUpScene
                ? t('sharedStorage.scenarios.scene1')
                : t('sharedStorage.scenarios.scene2')}
            </div>
            <div>
              {isUpScene
                ? t('sharedStorage.scenarios.loadUp')
                : t('sharedStorage.scenarios.loadDown')}
            </div>
            <Space
              style={{
                border: '1px solid #0181fd',
                borderRadius: 4,
                padding: 8,
                cursor: 'pointer',
                height: 24,
                lineHeight: '24px',
                color: '#0181fd',
                fontSize: 14,
              }}
              onClick={() => {
                setIsUpScene(!isUpScene)
                setButtonDisabled(false)
              }}
            >
              <SwapOutlined />
              {t('actions.switch')}
            </Space>
          </Space>
        </Col>
        <Col span={12} ref={containerRef}>
          <Charts
            containerSize={containerSize}
            isUpScene={isUpScene}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            isAtPeak={isAtPeak}
            setIsAtPeak={setIsAtPeak}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            refreshTag={refreshTag}
          />
        </Col>
        <Col
          span={2}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            style={{
              fontSize: t('language.english') === 'English' ? 12 : 16,
              ...(t('language.english') === 'English' && {
                maxWidth: 70,
              }),
            }}
            disabled={!isPaused || buttonDisabled}
            onClick={() => {
              if (isUpScene) {
                handleExpand()
              } else {
                handleShrink()
              }
              setButtonDisabled(true)
            }}
            type="primary"
          >
            {isUpScene
              ? t('sharedStorage.operations.expand')
              : t('sharedStorage.operations.shrink')}
          </Button>
        </Col>
      </Row>
    </div>
  )
}
