'use client'
import { Row, Col, Card, Tag, Typography, Button } from 'antd'
import { useState, useEffect } from 'react'
import styles from './index.module.css'
import { Column, G2 } from '@ant-design/charts'
import ReactMarkdown from 'react-markdown'
import dynamic from 'next/dynamic'
import { useMaterializedViewAnalytics } from '@/app/hooks/useAnalytics'

import {
  dataSource1,
  dataSource2,
  dataSource3,
  exampleSQL1,
  exampleSQL2,
  exampleSQL3,
} from '@/app/materialized-view/constant'

import { CopyOutlined } from '@ant-design/icons'
const { CheckableTag } = Tag
const { Text } = Typography

const { PLOT_CLASS_NAME, ELEMENT_CLASS_NAME, register } = G2

const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then((mod) => mod.Prism),
  { ssr: false }
)

export interface ImgResult {
  id: number
  distance: number
  file_name: string
  file_path: string
}

const SQLRenderer = ({ sql, tomorrow }: { sql: string; tomorrow: any }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !tomorrow) return null

  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              style={tomorrow}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}
    >
      {`\`\`\`sql\n${sql}\n\`\`\``}
    </ReactMarkdown>
  )
}

const DATA_LIST = [
  {
    label: '十万',
    value: 'hundredThousand',
  },
  {
    label: '百万',
    value: 'million',
  },
  {
    label: '千万',
    value: 'tenMillion',
  },
  {
    label: '亿',
    value: 'hundredMillion',
  },
]

export default function Main() {
  const { trackUserInteraction, trackBusinessMetric } =
    useMaterializedViewAnalytics()

  const [selectedTags, setSelectedTags] = useState<string[]>(
    DATA_LIST.map((item) => item.value)
  )

  const [selectValues, setSelectValues] = useState<string[]>([])

  // 动态导入主题（避免 HMR 问题）
  const [tomorrow, setTomorrow] = useState<any>(null)

  useEffect(() => {
    import('react-syntax-highlighter/dist/cjs/styles/prism/one-light').then(
      (mod) => setTomorrow(mod.default)
    )
  }, [])

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag)
    setSelectedTags(nextSelectedTags)
  }

  register('interaction.customElementHighlight', () => {
    return (context, _, emitter) => {
      const { container } = context
      const plotArea = container.querySelector(`.${PLOT_CLASS_NAME}`)
      const elements = plotArea.querySelectorAll(`.${ELEMENT_CLASS_NAME}`)
      const elementSet = new Set(elements)

      const pointerover = (e) => {
        const { target: element } = e
        if (!elementSet.has(element)) return
        setShowText(true)
      }

      const pointerout = (e) => {
        const { target: element } = e
        if (!elementSet.has(element)) return
        setShowText(false)
      }

      plotArea.addEventListener('pointerover', pointerover)
      plotArea.addEventListener('pointerout', pointerout)
      return () => {
        plotArea.removeEventListener('pointerover', pointerover)
        plotArea.removeEventListener('pointerout', pointerout)
      }
    }
  })

  // 新增 volume 到中文的映射表
  const VOLUME_LABEL_MAP: Record<string, string> = {
    hundredThousand: 'MV 数据量: 十万',
    million: 'MV 数据量: 百万',
    tenMillion: 'MV 数据量: 千万',
    hundredMillion: 'MV 数据量: 亿',
  }

  // 英文 type 到中文的映射表
  const TYPE_LABEL_MAP: Record<string, string> = {
    TimeDirectMV: '查物化视图',
    TimeMVPlusTable: '查物化视图+表',
    TimeWithoutMV: '不使用物化视图',
  }

  const data1 = dataSource1
    .filter(
      (item) => !selectValues.length || selectValues.includes(item.volume)
    )
    .filter((item) => {
      return selectedTags.includes(item.volume)
    })
    .map((item) => ({
      ...item,
      volume: VOLUME_LABEL_MAP[item.volume] || item.volume,
      type: TYPE_LABEL_MAP[item.type] || item.type,
      volumeType: item.volume,
    }))

  const data2 = dataSource2
    .filter(
      (item) => !selectValues.length || selectValues.includes(item.volume)
    )
    .filter((item) => {
      return selectedTags.includes(item.volume)
    })
    .map((item) => ({
      ...item,
      volume: VOLUME_LABEL_MAP[item.volume] || item.volume,
      type: TYPE_LABEL_MAP[item.type] || item.type,
      volumeType: item.volume,
    }))

  const data3 = dataSource3
    .filter(
      (item) => !selectValues.length || selectValues.includes(item.volume)
    )
    .filter((item) => {
      return selectedTags.includes(item.volume)
    })
    .map((item) => ({
      ...item,
      volume: VOLUME_LABEL_MAP[item.volume] || item.volume,
      type: TYPE_LABEL_MAP[item.type] || item.type,
      volumeType: item.volume,
    }))

  const [tabKey, setTabKey] = useState('mkv')

  const MAP_LIST: Record<
    string,
    {
      data: { volume: string; value: number; type: string }[]
      exampleSQL: string
    }
  > = {
    mkv: {
      data: data1,
      exampleSQL: exampleSQL1,
    },
    mav: {
      data: data2,
      exampleSQL: exampleSQL2,
    },
    makv: {
      data: data3,
      exampleSQL: exampleSQL3,
    },
  }

  const [showText, setShowText] = useState(false)

  const config = {
    interaction: {
      customElementHighlight: true,
    },
    forceFit: true,
    height: 240,
    legend: {
      color: {
        position: 'top',
        layout: {
          justifyContent: 'left',
        },
        crossPadding: 24,
      },
    },
    data: MAP_LIST?.[tabKey]?.data,
    yAxis: { min: 0 },
    axis: {
      y: {
        tickFilter: (_, i) => i % 2 !== 0,
        labelFormatter: (datum: any, index: number, array: any) => {
          return `${datum} us`
        },
      },
      x: {
        titleSpacing: 20,
        label: true, // 是否显示刻度值
        labelFontSize: 12, // 刻度值文字大小
        labelSpacing: 8,
      },
    },
    labels: [
      {
        text: 'value',
        style: { dy: -15 },
      },
    ],

    groupField: 'name',
    colorField: 'type',
    xField: 'volume',
    yField: 'value',
    style: {
      fill: ({ type }: { type: string }) => {
        if (type === '查物化视图') {
          return '#057cf2'
        }
        if (type === '查物化视图+表') {
          return '#20ca97'
        }
        if (type === '不使用物化视图') {
          return '#f5a517'
        }
      },
    },
    seriesField: 'type',
    isGroup: true,
  }

  const [expanded, setExpanded] = useState(false)
  const [copyHover, setCopyHover] = useState(false)

  return (
    <div className="p-6 w-full h-full">
      <Card
        tabList={[
          {
            tab: '两表连接（MKV）',
            key: 'mkv',
          },
          {
            tab: '单表聚合 (MAV)',
            key: 'mav',
          },
          {
            tab: '连接加聚合',
            key: 'makv',
          },
        ]}
        onTabChange={(key) => {
          setTabKey(key)
        }}
        bodyStyle={{
          background: '#f5f7fa',
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card
              title="MV 数据量"
              headStyle={{ borderBottom: 'none' }}
              bodyStyle={{
                paddingTop: 0,
              }}
            >
              <Row gutter={[16, 16]}>
                {DATA_LIST.map((tag) => (
                  <Col
                    key={tag.value}
                    span={6}
                    className={styles.activeWrapper}
                  >
                    <CheckableTag
                      checked={selectedTags.indexOf(tag.value) > -1}
                      onChange={(checked) => {
                        handleChange(tag.value, checked)
                      }}
                      style={{
                        width: '100%',
                        height: 40,
                        ...(selectedTags.indexOf(tag.value) > -1 && {
                          color: '#057CF2',
                        }),
                      }}
                    >
                      {tag.label}
                    </CheckableTag>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <Card
              title="分析结果"
              headStyle={{ borderBottom: 'none' }}
              bodyStyle={{
                paddingTop: 0,
              }}
            >
              <Column {...config} />
            </Card>
          </Col>
          <Col span={24} className={styles.uploadWrapper}>
            <Card
              title="SQL 内容"
              headStyle={{ borderBottom: 'none' }}
              bodyStyle={{
                paddingTop: 0,
              }}
              extra={
                <>
                  <Text
                    style={{
                      border: '1px solid #ccc',
                      padding: 8,
                      borderRadius: 4,
                    }}
                    onMouseEnter={() => {
                      setCopyHover(true)
                    }}
                    onMouseLeave={() => {
                      setCopyHover(false)
                    }}
                    copyable={{
                      text: MAP_LIST?.[tabKey]?.exampleSQL,
                      icon: (
                        <>
                          <CopyOutlined style={{ color: '#7c7c7c' }} />
                        </>
                      ),
                    }}
                  />
                </>
              }
            >
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    maxHeight: expanded ? 'none' : 160,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s',
                  }}
                >
                  <SQLRenderer
                    sql={MAP_LIST?.[tabKey]?.exampleSQL}
                    tomorrow={tomorrow}
                  />
                </div>
                {/* 渐变遮罩，仅在收起时显示 */}
                {!expanded && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: 32,
                      background:
                        'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.85))',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </div>
              <div style={{ textAlign: 'center', marginTop: 8 }}>
                <a onClick={() => setExpanded(!expanded)}>
                  {expanded ? '收起 ▲' : '展开 ▼'}
                </a>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
