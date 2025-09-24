'use client'
import { useState, useEffect, useRef } from 'react'
import { Col, Row } from 'antd'
import { StorageCube, CalculateStorageCube } from '../Storage'
import { useInterval } from 'ahooks'

const DemoDown = ({
  startShrink,
  setTaskDownDoneOne,
  setTaskDownDoneTwo,
  setTaskDownDoneThree,
  taskDownDoneOne,
  taskDownDoneTwo,
  taskDownDoneThree,
  refreshTag,
}: {
  startShrink: boolean
  setTaskDownDoneOne?: (taskDownDone: boolean) => void
  setTaskDownDoneTwo?: (taskDownDone: boolean) => void
  setTaskDownDoneThree?: (taskDownDone: boolean) => void
  taskDownDoneOne: boolean
  taskDownDoneTwo: boolean
  taskDownDoneThree: boolean
  refreshTag: boolean
}) => {
  const [isScaling, setIsScaling] = useState(true)
  const [isScalingCompleted, setIsScalingCompleted] = useState(false)

  // const [prePercent, setPrePercent] = useState(50)
  // const [scalePercent, setScalePercent] = useState(0)
  const [prePercent, setPrePercent] = useState(50)
  const [scalePercent, setScalePercent] = useState(50)

  useEffect(() => {
    if (prePercent == 50 && scalePercent === 0) {
      if (setTaskDownDoneOne) {
        setTaskDownDoneOne(true)
      }
      if (setTaskDownDoneTwo) {
        setTaskDownDoneTwo(true)
      }
      if (setTaskDownDoneThree) {
        setTaskDownDoneThree(true)
      }
    }
  }, [prePercent, scalePercent])

  useEffect(() => {
    if (prePercent === 25 && scalePercent === 25) {
      setIsScaling(false)
      setIsScalingCompleted(true)
    }
  }, [prePercent, scalePercent])

  const preIsPolling = isScaling && (prePercent >= 25 || scalePercent >= 25)

  // const preIsPolling = isScaling && prePercent >= 50 && prePercent < 100
  // 负载减少阶段
  useInterval(
    () => {
      const randomIncrement = 1 // 1-5之间的随机数
      setPrePercent(Math.max(prePercent - randomIncrement, 25))
      setScalePercent(Math.max(scalePercent - randomIncrement, 25))
    },
    preIsPolling ? 140 : undefined,
    {
      immediate: false,
    }
  )

  // 平衡阶段
  const reblance =
    startShrink && isScalingCompleted && (prePercent < 50 || scalePercent > 0)

  useInterval(
    () => {
      const randomIncrement = 1 // 1-2之间的随机数
      setPrePercent(Math.min(prePercent + randomIncrement, 50))
      setScalePercent(Math.max(scalePercent - randomIncrement, 0))
    },
    reblance ? 250 : undefined,
    {
      immediate: false,
    }
  )

  const [showCube, setShowCube] = useState(true)

  useEffect(() => {
    if (
      scalePercent === 0 &&
      taskDownDoneOne &&
      taskDownDoneTwo &&
      taskDownDoneThree
    ) {
      setTimeout(() => {
        setShowCube(false)
      }, 1000)
    }
  }, [scalePercent, taskDownDoneOne, taskDownDoneTwo, taskDownDoneThree])

  useEffect(() => {
    setPrePercent(50)
    setScalePercent(50)
    setIsScaling(true)
    setIsScalingCompleted(false)
    setShowCube(true)
  }, [refreshTag])

  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(180deg, #fcf2db 0%, #ffffff 100%)',
        borderRadius: 4,
        // opacity: 0.3,
        height: 378,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Row justify="center" className="p-4 h-full " gutter={[12, 0]}>
        <Col span={24} className="font-bold text-center text-[#132033]">
          Zone1
        </Col>
        <Col
          span={12}
          offset={!showCube ? 1 : 0}
          className="text-[#132039] text-center text-12px"
        >
          OBServer
        </Col>
        {showCube && <Col span={12}>OBServer</Col>}

        {/* 计算 */}
        <Col span={12} offset={!showCube ? 1 : 0}>
          <div className="bg-[#fbf2de] h-full">
            <CalculateStorageCube percent={100} />
          </div>
        </Col>

        {/* 扩容后的计算 */}
        {showCube && (
          <Col span={12}>
            <div className="bg-[#fbf2de] h-full">
              <CalculateStorageCube percent={100} />
            </div>
          </Col>
        )}

        {/* 存储 */}
        <Col span={12} offset={!showCube ? 1 : 0}>
          <div className="bg-[#fbf2de] h-full">
            <StorageCube percent={prePercent} />
          </div>
        </Col>

        {/* 扩容后的存储 */}
        {showCube && (
          <Col span={12}>
            <div className="bg-[#fbf2de] h-full">
              <StorageCube percent={scalePercent} />
            </div>
          </Col>
        )}
      </Row>
    </div>
  )
}

export default DemoDown
