'use client'
import { useState, useEffect, useRef } from 'react'
import { Col, Row } from 'antd'
import { CalculateStorageCube } from '../Storage'
import styles from './index.module.css'

const SeparationBlock = ({
  startExpand,
  startShrink,
  isUpScene,
  refreshTag,
}: {
  startExpand: boolean
  startShrink: boolean
  isUpScene: boolean
  refreshTag: boolean
}) => {
  // 实现逻辑
  // 点击扩容 - 开始动画 - 动画完成 - 展示右边节点
  // 初始缩容 - 展示右边节点 - 点击缩容 - 隐藏节点 - 开始动画 - 动作完成

  // 扩容场景开始点击扩容
  const sence1 = isUpScene && startExpand
  // 缩容场景开始点击缩容
  const sence2 = !isUpScene && startShrink

  // 控制动画状态
  const [startAnimation, setStartAnimation] = useState(false)
  const [upMoveDone, setUpMoveDone] = useState(false)

  // 触发动画
  useEffect(() => {
    if (sence1) {
      setStartAnimation(true)
      setTimeout(() => {
        setUpMoveDone(true)
      }, 2000)
    }
    if (sence2) {
      setStartAnimation(true)
    }
  }, [sence1, sence2])

  useEffect(() => {
    setStartAnimation(false)
    setUpMoveDone(false)
  }, [refreshTag, isUpScene])

  return (
    <div
      style={{
        borderRadius: 4,
      }}
    >
      <Row className="p-4 h-full w-full" gutter={[12, 18]}>
        <Col span={24} className="font-bold text-center text-[#132033]">
          Zone1
        </Col>
      </Row>

      {/* 计算 */}
      <div className="h-[130px] w-full relative">
        <div
          className={`h-full w-[100px] ${
            startAnimation
              ? isUpScene
                ? styles.animateToLeft
                : styles.animateToRight
              : ''
          }`}
          style={{
            position: 'absolute',
            left: isUpScene ? 'calc(50% - 50px)' : 'calc(50% - 125px)',
          }}
        >
          <div
            style={{
              marginBottom: 12,
            }}
          >
            OBServer
          </div>
          <div className="bg-[#edf1ff] h-[100px] w-full">
            <CalculateStorageCube
              percent={100}
              color="#0181fd"
              backgroundColor="#66a5f6"
            />
          </div>
        </div>

        {/* 扩容完成或者缩容场景下还未开始缩容 */}
        {(upMoveDone || (!isUpScene && !startShrink)) && (
          <div
            className="h-full w-[100px] "
            style={{
              position: 'absolute',
              right: 'calc(50% - 125px)',
            }}
          >
            <div
              style={{
                marginBottom: 12,
              }}
            >
              OBServer
            </div>
            <div className="bg-[#edf1ff]  h-[100px] w-full">
              <CalculateStorageCube
                percent={100}
                color="#0181fd"
                backgroundColor="#66a5f6"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SeparationBlock
