'use client'
import { useState, useEffect, useRef } from 'react'
import { Card, Col, Flex, Row, Space, Tag } from 'antd'
import Cloud from '../Cloud'
import DescribeContainer from '../DescribeContainer'
import { CheckCircleFilled, ClockCircleOutlined } from '@ant-design/icons'
import styles from './index.module.css'
import ResultChart from '../Charts/ResultChart'
import Demo from '../UpBlock'
import DemoDown from '../DownBlock'
import SeparationBlock from '../SeparationBlock'
import ConnectionLines from '../ConnectionLines'
import CapacityCount from '../CapacityCount'
// 使用 SVG 的 path 元素绘制连线
// 移除国际化依赖，使用固定中文文本
const isEnglish = () => false

export default function Main() {
  // 是否是扩容场景
  const [isUpScene, setIsUpScene] = useState(true)

  // 开始扩容
  const [startExpand, setStartExpand] = useState(false)
  // 开始缩容
  const [startShrink, setStartShrink] = useState(false)

  const [refreshTag, setRefreshTag] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const leftContainerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [leftContainerSize, setLeftContainerSize] = useState({
    width: 0,
    height: 0,
  })
  const [showAddHost, setShowAddHost] = useState(false)
  const [showDecreseHost, setShowDecreseHost] = useState(false)
  const [showBalance, setShowBalance] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showDownSuccess, setShowDownSuccess] = useState(false)
  const [showSuccessSecond, setShowSuccessSecond] = useState(false)
  const [showDownSuccessSecond, setShowDownSuccessSecond] = useState(false)

  const [showLoadMetadata, setShowLoadMetadata] = useState(false)
  const [showDownBalance, setShowDownBalance] = useState(false)
  const [showDownLoadMetadata, setShowDownLoadMetadata] = useState(false)

  const [showDownDecreseHost, setShowDownDecreseHost] = useState(false)

  const [isPaused, setIsPaused] = useState(false)

  const [taskDoneOne, setTaskDoneOne] = useState(false)
  const [taskDoneTwo, setTaskDoneTwo] = useState(false)
  const [taskDoneThree, setTaskDoneThree] = useState(false)
  // 缩容任务
  const [taskDownDoneOne, setTaskDownDoneOne] = useState(false)
  const [taskDownDoneTwo, setTaskDownDoneTwo] = useState(false)
  const [taskDownDoneThree, setTaskDownDoneThree] = useState(false)

  useEffect(() => {
    setStartExpand(false)
    setStartShrink(false)

    setShowAddHost(false)
    setShowDecreseHost(false)
    setShowBalance(false)
    setShowSuccess(false)
    setShowDownSuccess(false)
    setShowSuccessSecond(false)
    setShowDownSuccessSecond(false)

    setShowLoadMetadata(false)
    setShowDownBalance(false)
    setShowDownLoadMetadata(false)

    setShowDownDecreseHost(false)

    setTaskDoneOne(false)
    setTaskDoneTwo(false)
    setTaskDoneThree(false)

    setTaskDownDoneOne(false)
    setTaskDownDoneTwo(false)
    setTaskDownDoneThree(false)
  }, [isUpScene, refreshTag])

  // 监听容器尺寸变化
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setContainerSize({ width, height })
      }
      if (leftContainerRef.current) {
        const { width, height } =
          leftContainerRef.current.getBoundingClientRect()
        setLeftContainerSize({ width, height })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    if (taskDoneOne && taskDoneTwo && taskDoneThree) {
      setShowBalance(false)
      setShowSuccess(true)
    }
  }, [isPaused, taskDoneOne, taskDoneTwo, taskDoneThree])

  useEffect(() => {
    if (taskDownDoneOne && taskDownDoneTwo && taskDownDoneThree) {
      setShowDownBalance(false)
      setShowDownDecreseHost(true)

      setTimeout(() => {
        setShowDownDecreseHost(false)
        setShowDownSuccessSecond(true)
      }, 2000)
    }
  }, [taskDownDoneOne, taskDownDoneTwo, taskDownDoneThree])

  return (
    <div className="p-6 w-full h-full pt-2">
      <Flex className="h-full bg-[#f6f8fb] p-6 " vertical>
        <div className="pb-2">
          <DescribeContainer
            refreshTag={refreshTag}
            handleExpand={() => {
              setShowAddHost(true)
              setTimeout(() => {
                setStartExpand(true)
                setShowAddHost(false)
                setShowBalance(true)
              }, 1500)
            }}
            handleShrink={() => {
              setShowDownLoadMetadata(true)
              setShowDownBalance(true)
              setTimeout(() => {
                setStartShrink(true)
                setShowDownLoadMetadata(false)
                setShowDecreseHost(true)
              }, 1500)
              setTimeout(() => {
                setShowDecreseHost(false)
                setShowDownSuccess(true)
              }, 3500)
            }}
            isUpScene={isUpScene}
            setIsUpScene={setIsUpScene}
            setRefreshTag={setRefreshTag}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
          />
        </div>
        <div
          style={{
            height: 50,
            minHeight: 50,
            display: 'flex',
            justifyContent: 'space-around',
            fontSize: 24,
            fontWeight: 700,
            alignItems: 'center',
            // marginInline: 116,
            fontFamily: 'AlimamaShuHeiTi-Bold',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '50%',
              minWidth: 640,
              height: 50,
              lineHeight: '50px',
              textAlign: 'center',

              background:
                'linear-gradient(to right, rgb(255,255,255), rgb(205, 152, 70))',
            }}
          >
            存算一体
          </div>
          <div
            style={{
              backgroundImage:
                'url(https://mdn.alipayobjects.com/huamei_pwwvc1/afts/img/A*m7TjT6Swj9oAAAAAQDAAAAgAeomUAQ/original)',
              position: 'absolute',
              left: leftContainerSize.width <= 640 ? 605 : 'calc(50% - 50px)',
              width: 100,
              height: '100%',
              backgroundSize: 'auto 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              zIndex: 10,
            }}
          ></div>
          <div
            style={{
              width: '50%',
              textAlign: 'center',
              height: 50,
              lineHeight: '50px',
              background:
                'linear-gradient(to left, rgb(255,255,255), rgb(21, 120, 249))',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              paddingLeft: 50,
            }}
          >
            存算分离
          </div>
        </div>
        <Flex
          flex={1}
          gap={24}
          style={{ width: '100%', marginTop: 24, marginBottom: 24 }}
        >
          <Flex flex={1}>
            <Card
              style={{ width: '100%', minWidth: 640 }}
              ref={leftContainerRef}
              styles={{ body: { display: 'flex', flexDirection: 'column' } }}
            >
              <Row gutter={24} className="text-center">
                <Col span={8}>
                  {isUpScene ? (
                    <Demo
                      startExpand={startExpand}
                      setTaskDoneOne={setTaskDoneOne}
                      refreshTag={refreshTag}
                    />
                  ) : (
                    <DemoDown
                      startShrink={startShrink}
                      setTaskDownDoneOne={setTaskDownDoneOne}
                      taskDownDoneOne={taskDownDoneOne}
                      taskDownDoneTwo={taskDownDoneTwo}
                      taskDownDoneThree={taskDownDoneThree}
                      refreshTag={refreshTag}
                    />
                  )}
                </Col>
                <Col span={8}>
                  {isUpScene ? (
                    <Demo
                      startExpand={startExpand}
                      setTaskDoneTwo={setTaskDoneTwo}
                      refreshTag={refreshTag}
                    />
                  ) : (
                    <DemoDown
                      startShrink={startShrink}
                      setTaskDownDoneTwo={setTaskDownDoneTwo}
                      taskDownDoneOne={taskDownDoneOne}
                      taskDownDoneTwo={taskDownDoneTwo}
                      taskDownDoneThree={taskDownDoneThree}
                      refreshTag={refreshTag}
                    />
                  )}
                </Col>
                <Col span={8}>
                  {isUpScene ? (
                    <Demo
                      startExpand={startExpand}
                      setTaskDoneThree={setTaskDoneThree}
                      refreshTag={refreshTag}
                    />
                  ) : (
                    <DemoDown
                      startShrink={startShrink}
                      setTaskDownDoneThree={setTaskDownDoneThree}
                      taskDownDoneOne={taskDownDoneOne}
                      taskDownDoneTwo={taskDownDoneTwo}
                      taskDownDoneThree={taskDownDoneThree}
                      refreshTag={refreshTag}
                    />
                  )}
                </Col>
                {/* 添加主机 */}
                {isUpScene && showAddHost && (
                  <Col span={24}>
                    <Space>
                      <span>
                        <ClockCircleOutlined
                          style={{
                            color: '#1063fa',
                          }}
                        />
                      </span>
                      <span className="text-14px text-[#132039]  font-medium">
                        添加主机（用时 1 分钟）
                      </span>
                    </Space>
                  </Col>
                )}
                {!isUpScene && showDownDecreseHost && (
                  <Col span={24}>
                    <Space>
                      <span>
                        <ClockCircleOutlined
                          style={{
                            color: '#1063fa',
                          }}
                        />
                      </span>
                      <span className="text-14px text-[#132039]  font-medium">
                        减少主机（用时 1 分钟）
                      </span>
                    </Space>
                  </Col>
                )}
                {/* 数据均衡 */}
                {isUpScene && showBalance && (
                  <Col span={24}>
                    <Space>
                      <span>
                        <ClockCircleOutlined
                          style={{
                            color: '#1063fa',
                          }}
                        />
                      </span>
                      <span className="text-14px text-[#132039]  font-medium">
                        数据均衡（用时 10 小时）
                      </span>
                    </Space>
                  </Col>
                )}
                {/* 缩容数据均衡 */}
                {!isUpScene && showDownBalance && (
                  <Col span={24}>
                    <Space>
                      <span>
                        <ClockCircleOutlined
                          style={{
                            color: '#1063fa',
                          }}
                        />
                      </span>
                      <span className="text-14px text-[#132039]  font-medium">
                        数据均衡（用时 10 小时）
                      </span>
                    </Space>
                  </Col>
                )}
                {/* 扩容完成 */}
                {isUpScene && showSuccess && (
                  <Col span={24}>
                    <Space>
                      <span>
                        <CheckCircleFilled
                          style={{
                            color: '#27b67c',
                          }}
                        />
                      </span>
                      <span className="text-14px text-[#132039]  font-medium">
                        已完成（用时 10 小时）
                      </span>
                    </Space>
                  </Col>
                )}
                {!isUpScene && showDownSuccessSecond && (
                  <Col span={24}>
                    <Space>
                      <span>
                        <CheckCircleFilled
                          style={{
                            color: '#27b67c',
                          }}
                        />
                      </span>
                      <span className="text-14px text-[#132039]  font-medium">
                        已完成（用时 10 小时）
                      </span>
                    </Space>
                  </Col>
                )}
              </Row>
            </Card>
          </Flex>
          <Flex flex={1}>
            <Card
              style={{ position: 'relative', width: '100%' }}
              styles={{ body: { display: 'flex', flexDirection: 'column' } }}
            >
              <Row gutter={24} className="text-center">
                <Col span={24}>
                  <div
                    style={{
                      backgroundImage:
                        'linear-gradient(180deg, #eef3ff 0%, #ffffff 100%)',
                      // backgroundImage:
                      //   'linear-gradient(0deg, #ffffff -5%, #eef3ff 21%),linear-gradient(180deg, #eef3ff 0%, #ffffff 100%)',

                      borderRadius: 4,
                      height: 378,
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      overflowX: 'scroll',
                    }}
                  >
                    <Row gutter={24} className="w-full text-center ">
                      <Col span={12} offset={6}>
                        <SeparationBlock
                          startExpand={startExpand}
                          startShrink={startShrink}
                          isUpScene={isUpScene}
                          refreshTag={refreshTag}
                        />
                      </Col>
                      <Col
                        span={24}
                        ref={containerRef}
                        style={{
                          height: 90,
                        }}
                      >
                        <ConnectionLines
                          refreshTag={refreshTag}
                          containerSize={containerSize}
                          startExpand={startExpand}
                          isUpScene={isUpScene}
                          startShrink={startShrink}
                          setShowLoadMetadata={setShowLoadMetadata}
                          setShowSuccessSecond={setShowSuccessSecond}
                        />
                      </Col>
                      <Col
                        span={12}
                        offset={6}
                        className="w-full h-full  "
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div className="w-[92px]  flex flex-col justify-end items-center pb-3">
                          <Cloud
                            startExpand={startExpand}
                            startShrink={startShrink}
                            isUpScene={isUpScene}
                            refreshTag={refreshTag}
                          />

                          <div style={{ fontSize: 10 }}>
                            <CapacityCount isUpScene={isUpScene} />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                {/* 添加主机 */}
                {isUpScene && showAddHost && (
                  <Col span={24}>
                    <Space>
                      <span>
                        <ClockCircleOutlined
                          style={{
                            color: '#1063fa',
                          }}
                        />
                      </span>
                      <span className="text-14px text-[#132039]  font-medium">
                        添加主机（用时 1 分钟）
                      </span>
                    </Space>
                  </Col>
                )}
                {/* 减少主机 */}
                {!isUpScene && showDecreseHost && (
                  <Col span={24}>
                    <Space>
                      <span>
                        <ClockCircleOutlined
                          style={{
                            color: '#1063fa',
                          }}
                        />
                      </span>
                      <span className="text-14px text-[#132039]  font-medium">
                        减少主机（用时 1 分钟）
                      </span>
                    </Space>
                  </Col>
                )}
                {/* 加载元数据 */}
                {isUpScene && showLoadMetadata && (
                  <Col span={24}>
                    <Space>
                      <span>
                        <ClockCircleOutlined
                          style={{
                            color: '#1063fa',
                          }}
                        />
                      </span>
                      <span className="text-14px text-[#132039]  font-medium">
                        加载元数据（用时 1 分钟）
                      </span>
                    </Space>
                  </Col>
                )}
                {/* 缩容加载元数据 */}
                {!isUpScene && showDownLoadMetadata && (
                  <Col span={24}>
                    <Space>
                      <span>
                        <ClockCircleOutlined
                          style={{
                            color: '#1063fa',
                          }}
                        />
                      </span>
                      <span className="text-14px text-[#132039]  font-medium">
                        加载元数据（用时 1 分钟）
                      </span>
                    </Space>
                  </Col>
                )}
                {/* 扩容完成 */}
                {isUpScene && showSuccessSecond && (
                  <Col span={24}>
                    <Space>
                      <span>
                        <CheckCircleFilled
                          style={{
                            color: '#27b67c',
                          }}
                        />
                      </span>
                      <span className="text-14px text-[#132039]  font-medium">
                        已完成（用时 1 分钟）
                      </span>
                      <Tag style={{ color: '#0ac185' }}>🎉 用时更短</Tag>
                    </Space>
                  </Col>
                )}
                {/* 缩容完成 */}
                {!isUpScene && showDownSuccess && (
                  <Col span={24}>
                    <Space>
                      <span>
                        <CheckCircleFilled
                          style={{
                            color: '#27b67c',
                          }}
                        />
                      </span>
                      <span className="text-14px text-[#132039]  font-medium">
                        已完成（用时 1 分钟）
                      </span>
                      <Tag style={{ color: '#0ac185' }}>🎉 用时更短</Tag>
                    </Space>
                  </Col>
                )}
              </Row>
            </Card>
          </Flex>
        </Flex>
        {((showSuccess && showSuccessSecond) ||
          (showDownSuccess && showDownSuccessSecond)) && (
          <div
            className={`${styles.box} flex justify-center items-center gap-16 p-6`}
            style={{
              fontSize: isEnglish() ? 12 : 20,
            }}
          >
            <div>
              负载变化较大时，存算分离架构扩缩容无需拷贝数据，弹性更快速
            </div>
            <div>
              <ResultChart />
            </div>
          </div>
        )}
      </Flex>
    </div>
  )
}
