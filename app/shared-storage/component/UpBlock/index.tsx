'use client'
import { useState, useEffect, useRef } from 'react'
import { Col, Row } from 'antd'
import { StorageCube, CalculateStorageCube } from '../Storage'
import { useInterval } from 'ahooks'

const Demo = ({
  startExpand,
  setTaskDoneOne,
  setTaskDoneTwo,
  setTaskDoneThree,
  refreshTag,
}: {
  startExpand: boolean
  setTaskDoneOne?: (taskDone: boolean) => void
  setTaskDoneTwo?: (taskDone: boolean) => void
  setTaskDoneThree?: (taskDone: boolean) => void
  refreshTag: boolean
}) => {
  const [isScaling, setIsScaling] = useState(true)
  const [isScalingCompleted, setIsScalingCompleted] = useState(false)

  const [prePercent, setPrePercent] = useState(50)
  const [scalePercent, setScalePercent] = useState(0)

  useEffect(() => {
    setPrePercent(50)
    setScalePercent(0)
    setIsScaling(true)
    setIsScalingCompleted(false)
  }, [refreshTag])

  useEffect(() => {
    if (prePercent >= 100) {
      setIsScaling(false)
      setIsScalingCompleted(true)
    }
  }, [prePercent])

  const preIsPolling = isScaling && prePercent >= 50 && prePercent < 100
  // 增长阶段
  useInterval(
    () => {
      const randomIncrement = 1 // 1-5之间的随机数
      setPrePercent(Math.min(prePercent + randomIncrement, 100))
    },
    preIsPolling ? 70 : undefined,
    {
      immediate: false,
    }
  )
  // 平衡阶段
  const reblance =
    startExpand && isScalingCompleted && prePercent > 50 && prePercent <= 100

  useEffect(() => {
    if (prePercent === scalePercent) {
      if (setTaskDoneOne) {
        setTaskDoneOne(true)
      }
      if (setTaskDoneTwo) {
        setTaskDoneTwo(true)
      }
      if (setTaskDoneThree) {
        setTaskDoneThree(true)
      }
    }
  }, [prePercent, scalePercent])

  useInterval(
    () => {
      const randomIncrement = 1 // 1-2之间的随机数

      setPrePercent(Math.max(prePercent - randomIncrement, 50))
      setScalePercent(Math.min(scalePercent + randomIncrement, 50))
    },
    reblance ? 175 : undefined,
    {
      immediate: false,
    }
  )

  const showCube = startExpand && !isScaling

  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(180deg, #fcf2db 0%, #ffffff 100%)',
        borderRadius: 4,
        height: 378,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Row justify="center" className="p-4 h-full " gutter={[12, 0]}>
        <Col span={24} className="font-bold text-center text-[#132033] mt-3">
          {setTaskDoneOne && 'Zone 1'}
          {setTaskDoneTwo && 'Zone 2'}
          {setTaskDoneThree && 'Zone 3'}
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

export default Demo
