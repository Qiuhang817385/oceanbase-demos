'use client'
import { useState, useEffect, useRef } from 'react'
import { Alert, Card, Col, Flex, Row, Space, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { StorageCube, CalculateStorageCube } from '../Storage'
import Cloud from '../Cloud'
import { InfoCircleOutlined } from '@ant-design/icons'
import styles from './index.module.css'
import '@/lib/i18n/client-init'

// 使用 SVG 的 path 元素绘制连线
const ConnectionLines = ({
  containerSize,
}: {
  containerSize: { width: number; height: number }
}) => {
  const { width } = containerSize

  const startX = width * 0.5
  const startY = 0
  const endY = 82

  const originPoints1 = `${startX},${startY} ${startX},${
    startY + 20
  } ${startX},${startY + 20} ${startX},${endY}`

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="5.5 0, 10 3.5, 5.5 7" fill="#bbb" />
        </marker>
      </defs>

      {/* 第一条连线：计算单元1 -> 存储 */}
      <polyline
        points={originPoints1}
        stroke="#bbb"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
    </svg>
  )
}

const Demo = () => {
  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(180deg, #fcf2db 0%, #ffffff 100%)',
        borderRadius: 4,
        height: 378,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 4,
      }}
    >
      <Row justify="center" className="p-4 h-full " gutter={[12, 0]}>
        <Col span={24} className="font-bold text-center text-[#132033]">
          Zone1
        </Col>
        <Col
          span={24}
          className="text-[#132039] text-center"
          style={{ fontSize: 12 }}
        >
          OBServer
        </Col>

        {/* 计算 */}
        <Col
          span={24}
          className="bg-[#fbf2de]"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div className=" h-full w-full ">
            <CalculateStorageCube percent={100} />
          </div>
        </Col>

        {/* 存储 */}
        <Col
          span={24}
          className="bg-[#fbf2de]"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div className="h-full  w-full">
            <StorageCube percent={100} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

const Demo2 = () => {
  return (
    <div
      style={{
        borderRadius: 4,
        height: 193,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Row justify="center" className="p-4 h-full w-full" gutter={[12, 18]}>
        <Col span={24} className="font-bold text-center text-[#132033]">
          Zone1
        </Col>
        <Col
          span={24}
          className="text-[#132039] text-center"
          style={{ fontSize: 12 }}
        >
          OBServer
        </Col>
        {/* 计算 */}
        <Col span={12} style={{ height: 100 }}>
          <div className="bg-[#dde1ff] h-full">
            <CalculateStorageCube
              percent={100}
              color="#0181fd"
              backgroundColor="#66a5f6"
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default function Main() {
  const { t } = useTranslation('translation')
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  // 监听容器尺寸变化
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

  return (
    <div className="p-6 w-full h-full">
      <Flex className="h-full bg-[#f6f8fb] p-6 " vertical>
        <div
          style={{
            width: '100%',
            height: 50,
            minHeight: 50,
            display: 'flex',
            justifyContent: 'space-around',
            backgroundImage:
              'url(https://mdn.alipayobjects.com/huamei_dbqypo/afts/img/A*t2hzQ5bvWvsAAAAAAAAAAAAADuGYAQ/original)',
            backgroundSize: 'auto 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            fontSize: 24,
            alignItems: 'center',
            // marginInline: 116,
            fontFamily: 'AlimamaShuHeiTi-Bold',
            fontWeight: 700,
          }}
        >
          <span>{t('sharedStorage.architecture.integrated')}</span>
          <span>{t('sharedStorage.architecture.separated')}</span>
        </div>
        <Flex
          flex={1}
          gap={24}
          style={{ width: '100%', marginTop: 24, marginBottom: 24 }}
        >
          <Flex flex={1}>
            <Card
              title={
                <div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                    }}
                  >
                    {t('sharedStorage.storage.replica')}
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                    }}
                  >
                    <Space>
                      <span>{t('sharedStorage.storage.price1')}</span>
                      <span>
                        <Tooltip title={t('sharedStorage.cost.priceNote')}>
                          <InfoCircleOutlined style={{ fontSize: 13 }} />
                        </Tooltip>
                      </span>
                    </Space>
                  </div>
                </div>
              }
              headStyle={{
                textAlign: 'center',
                backgroundColor: '#cb933e',
                padding: 16,
                color: '#fff',
              }}
              style={{ width: '100%' }}
              styles={{ body: { display: 'flex', flexDirection: 'column' } }}
            >
              <Row gutter={24} className="text-center">
                <Col span={8}>
                  <Demo />
                </Col>
                <Col span={8}>
                  <Demo />
                </Col>
                <Col span={8}>
                  <Demo />
                </Col>
              </Row>
            </Card>
          </Flex>
          <Flex flex={1}>
            <Card
              style={{ position: 'relative', width: '100%' }}
              styles={{ body: { display: 'flex', flexDirection: 'column' } }}
              title={
                <div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                    }}
                  >
                    {t('sharedStorage.storage.singleReplica')}
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                    }}
                  >
                    <Space>
                      <span>{t('sharedStorage.storage.price2')}</span>
                      <span>
                        <Tooltip title={t('sharedStorage.cost.priceNote')}>
                          <InfoCircleOutlined style={{ fontSize: 13 }} />
                        </Tooltip>
                      </span>
                    </Space>
                  </div>
                </div>
              }
              headStyle={{
                textAlign: 'center',
                backgroundColor: '#1578f9',
                padding: 16,
                color: '#fff',
              }}
            >
              <Row gutter={24} className="text-center">
                <Col span={24}>
                  <div
                    style={{
                      backgroundImage:
                        'linear-gradient(0deg, #ffffff -5%, #eef3ff 21%),linear-gradient(180deg, #eef3ff 0%, #ffffff 100%)',
                      borderRadius: 4,
                      height: 378,
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}
                  >
                    <Row gutter={[24, 0]} className="w-full text-center ">
                      <Col span={12} offset={6}>
                        <Demo2 />
                      </Col>
                      <Col
                        span={24}
                        ref={containerRef}
                        style={{
                          height: 90,
                        }}
                      >
                        <ConnectionLines containerSize={containerSize} />
                      </Col>
                      <Col
                        span={12}
                        offset={6}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div className="w-[92px] flex flex-col justify-end items-center pb-4">
                          <Cloud />
                          <div style={{ fontSize: 10 }}>100 T</div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Card>
          </Flex>
        </Flex>
        <div>
          <div
            className={`${styles.box} flex justify-start items-center pl-[36px]`}
          >
            <span style={{ fontSize: 20 }}>
              {t('sharedStorage.cost.reduced')}
              <span className="font-bold">{' 1/3'}</span>，
              {t('sharedStorage.cost.storageReduced')}
              <span className="font-bold">{' 60%~70%'}</span>
            </span>
          </div>
        </div>
      </Flex>
    </div>
  )
}
