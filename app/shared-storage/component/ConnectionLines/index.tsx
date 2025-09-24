'use client'
import { useState, useEffect } from 'react'
import { useInterval } from 'ahooks'

const ConnectionLines = ({
  containerSize,
  startExpand,
  isUpScene,
  startShrink,
  setShowLoadMetadata,
  setShowSuccessSecond,
  refreshTag,
}: {
  containerSize: { width: number; height: number }
  startExpand: boolean
  isUpScene: boolean
  startShrink: boolean
  setShowLoadMetadata: (showLoadMetadata: boolean) => void
  setShowSuccessSecond: (showSuccessSecond: boolean) => void
  refreshTag: boolean
}) => {
  const [showPolyline, setShowPolyline] = useState(isUpScene ? false : true)
  useEffect(() => {
    setShowPolyline(isUpScene ? false : true)
    return () => {
      setShowPolyline(false)
    }
  }, [isUpScene])

  useEffect(() => {
    setShowPolyline(isUpScene ? false : true)
  }, [refreshTag])

  const { width, height } = containerSize

  const startX = width * 0.5
  const offSetX = 75
  const endTag = startX - offSetX

  const startY = 5

  const [step, setStep] = useState(startX)
  useEffect(() => {
    if (isUpScene) {
      setStep(startX)
    } else {
      setStep(endTag)
    }
  }, [startX, isUpScene, refreshTag, endTag])

  const endY = 82

  const originPoints1 = `
  ${step},${startY} 
  ${step},${startY + 20} 
  ${startX},${startY + 20} 
  ${startX},${endY}`

  const points1 = `${endTag},${startY} ${endTag},${startY + 20} ${startX},${
    startY + 20
  } ${startX},${endY}`

  const points2 = `
  ${startX + offSetX},${startY} 
  ${startX + offSetX},${startY + 20} 
  ${startX},${startY + 20} 
  ${startX},${endY}`

  const pollingUp = isUpScene && isUpScene && startExpand && step > endTag
  // 增长阶段
  useInterval(
    () => {
      const randomIncrement = 1 // 1-5之间的随机数
      setStep(Math.max(step - randomIncrement, endTag))
    },
    pollingUp ? 25 : undefined,
    {
      immediate: false,
    }
  )

  const pollingDown = !isUpScene && !isUpScene && startShrink && step < startX
  // 增长阶段
  useInterval(
    () => {
      const randomIncrement = 1 // 1-5之间的随机数
      setStep(Math.min(step + randomIncrement, startX))
    },
    pollingDown ? 25 : undefined,
    {
      immediate: false,
    }
  )

  useEffect(() => {
    if (startExpand || startShrink) {
      setShowLoadMetadata(true)
    }

    setTimeout(() => {
      if (startExpand) {
        setShowPolyline(true)
      }
      if (startShrink) {
        setShowPolyline(false)
      }
    }, 2000)

    setTimeout(() => {
      if (startExpand || startShrink) {
        setShowLoadMetadata(false)
        setShowSuccessSecond(true)
      }
    }, 3500)
  }, [startExpand, startShrink])

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="9"
          markerHeight="7"
          refX="7"
          refY="3.5"
          orient="auto"
        >
          <polygon points="5 0, 10 3.5, 5 7" fill="#bbb" />
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

      {/* 第二条连线：计算单元2 -> 存储 */}
      {showPolyline &&
        !!((isUpScene && startExpand) || (!isUpScene && !startShrink)) && (
          <polyline
            points={points2}
            stroke="#bbb"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
          />
        )}
    </svg>
  )
}

export default ConnectionLines
