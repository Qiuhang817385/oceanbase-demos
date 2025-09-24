'use client'
import { Line } from '@ant-design/plots'
import { useState, useEffect } from 'react'

export default function Main({
  containerSize,
  isUpScene,
  isPaused,
  setIsPaused,
  currentIndex,
  setCurrentIndex,
  refreshTag,
}: {
  containerSize: { width: number; height: number }
  isUpScene: boolean
  isPaused: boolean
  setIsPaused: (isPaused: boolean) => void
  currentIndex: number
  setCurrentIndex: (currentIndex: number) => void
  refreshTag: boolean
}) {
  // 原始静态数据
  const originalData1 = [
    { time: 1719892680000, value: 50 },
    { time: 1719896280000, value: 51 },
    { time: 1719900880000, value: 53 },
    { time: 1719905480000, value: 56 },
    { time: 1719910080000, value: 60 },
    { time: 1719914680000, value: 65 },
    { time: 1719919280000, value: 70.5 },
    { time: 1719923880000, value: 76.5 },
    { time: 1719928480000, value: 83 },
    { time: 1719933080000, value: 90 },
    { time: 1719936680000, value: 100 },
  ]

  const originalData2 = [
    { time: 1719892680000, value: 100 },
    { time: 1719896280000, value: 90 },
    { time: 1719900880000, value: 83 },
    { time: 1719905480000, value: 76.5 },
    { time: 1719910080000, value: 70.5 },
    { time: 1719914680000, value: 65 },
    { time: 1719919280000, value: 60 },
    { time: 1719923880000, value: 56 },
    { time: 1719928480000, value: 53 },
    { time: 1719933080000, value: 51 },
    { time: 1719936680000, value: 50 },
  ]

  const originalData = isUpScene ? originalData1 : originalData2
  // 计算 Y 轴固定范围
  const maxValue = Math.max(...originalData.map((item) => item.value))
  const minValue = Math.min(...originalData.map((item) => item.value))

  // 找到最高点和最低点的索引
  const maxValueIndex = originalData.findIndex(
    (item) => item.value === maxValue
  )
  const minValueIndex = originalData.findIndex(
    (item) => item.value === minValue
  )

  const [data, setData] = useState<
    Array<{ time: number; value: number | null }>
  >([])

  // 当场景切换时，重置数据
  useEffect(() => {
    setData([])
    setIsPaused(false)
    setCurrentIndex(0)
  }, [isUpScene, refreshTag])

  // 定时器效果 - 根据 isUpScene 控制数据填充方向
  useEffect(() => {
    if (isPaused) return // 如果暂停，不执行定时器
    const timer = setInterval(() => {
      if (currentIndex < originalData.length) {
        // 创建包含所有年份但只填充到当前索引的数据
        const newData = originalData.map((item, index) => ({
          time: item.time as number,
          value: index <= currentIndex ? item.value : null, // 未填充的数据设为 null
        }))

        setData(newData)

        // 根据场景检查是否到达关键点
        if (isUpScene && currentIndex === maxValueIndex) {
          // 上升场景：到达最高点时暂停
          setIsPaused(true)
        } else if (!isUpScene && currentIndex === minValueIndex) {
          // 下降场景：到达最低点时暂停
          setIsPaused(true)
        }

        setCurrentIndex(currentIndex + 1)
      } else {
        // 数据填充完成后清除定时器
        clearInterval(timer)
      }
    }, 250) // 1秒间隔

    return () => clearInterval(timer)
  }, [
    currentIndex,
    isPaused,
    maxValueIndex,
    minValueIndex,
    isUpScene,
    originalData,
    setCurrentIndex,
    setIsPaused,
  ])

  // 格式化数据，将时间戳转换为可读格式
  const formattedData = data
    .filter((item) => item.value !== null)
    .map((item) => ({
      ...item,
      timeFormatted: new Date(item.time).toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }))

  const config = {
    data: formattedData, // 使用格式化后的数据
    xField: 'time',
    yField: 'value',
    width: containerSize.width,
    height: 80,
    shapeField: 'smooth',
    meta: {
      time: {
        formatter: (value: number) => {
          const date = new Date(value)
          return `${date.getHours().toString().padStart(2, '0')}:${date
            .getMinutes()
            .toString()
            .padStart(2, '0')}`
        },
      },
    },
    scale: {
      y: {
        domainMax: 120, // 固定 Y 轴最大值
        domainMin: 0, // 固定 Y 轴最小值
      },
      x: {
        // 固定 X 轴范围
        domain: originalData.map((item) => item.time),
      },
    },
    interaction: {
      tooltip: false,
    },
    style: {
      lineWidth: 2,
    },
    // 正确的网格配置
    axis: {
      y: {
        grid: true,
        gridStroke: '#aaa',
        gridStrokeOpacity: 0.5,
        gridFilter: (datum: any, index: number, data: any) => {
          return index % 2 === 0
        },
        gridLineWidth: 1,
        labelFormatter: (datum: any, index: number, array: any) => {
          return `${datum} T`
        },
      },
      x: {
        grid: true,
        gridStroke: '#aaa',
        gridStrokeOpacity: 0.5,
        gridFilter: (datum: any, index: number, data: any) => {
          return index % 2 === 0
        },
        gridLineWidth: 1,
        label: false, // 隐藏 X 轴标签
      },
    },
    // 折线渐变配置
    line: {
      style: {
        stroke: 'l(270) 0:#7ec2f3 1:#f98e8e',
        lineWidth: 3,
      },
    },
  }

  return (
    <div>
      <div>
        <Line {...config} />
      </div>
    </div>
  )
}
