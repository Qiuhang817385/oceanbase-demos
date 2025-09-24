'use client'
import { Flex } from 'antd'
import { useEffect, useState } from 'react'
import styles from './index.module.css'
import $i18n, { isEnglish } from '../../../../i18n'

const Cloud = ({
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
  const [colorIndex, setColorIndex] = useState(0)
  const [animationType, setAnimationType] = useState<
    'breathing' | 'colorShift' | 'pulse'
  >('pulse')

  const [startAnimation, setStartAnimation] = useState(false)

  useEffect(() => {
    if (startExpand || startShrink) {
      setStartAnimation(true)
      setTimeout(() => {
        setStartAnimation(false)
      }, 4000)
    }
  }, [startExpand, startShrink])

  // 定义颜色数组
  const colors = [
    { primary: '#0181FD', secondary: '#66A5F6' }, // 蓝色
    { primary: '#52C41A', secondary: '#95DE64' }, // 绿色
    { primary: '#FA8C16', secondary: '#FFC53D' }, // 橙色
    { primary: '#F5222D', secondary: '#FF7875' }, // 红色
    { primary: '#722ED1', secondary: '#B37FEB' }, // 紫色
  ]

  // 循环切换颜色
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setColorIndex((prev) => (prev + 1) % colors.length)
  //   }, 3000) // 每3秒切换一次颜色

  //   return () => clearInterval(interval)
  // }, [colors.length])

  // // 循环切换动画类型
  // useEffect(() => {
  //   const animationInterval = setInterval(() => {
  //     setAnimationType((prev) => {
  //       switch (prev) {
  //         case 'breathing':
  //           return 'pulse'
  //         // case 'colorShift':
  //         //   return 'pulse'
  //         case 'pulse':
  //           return 'breathing'
  //         default:
  //           return 'breathing'
  //       }
  //     })
  //   }, 1000) // 每8秒切换一次动画类型

  //   return () => clearInterval(animationInterval)
  // }, [])

  const currentColors = colors[colorIndex]

  // 根据动画类型获取对应的CSS类名
  const getAnimationClass = () => {
    switch (animationType) {
      case 'breathing':
        return styles.cloudContainer
      case 'colorShift':
        return `${styles.cloudContainer} ${styles.colorTransition}`
      case 'pulse':
        return `${styles.cloudContainer} ${styles.pulse}`
      default:
        return styles.cloudContainer
    }
  }

  return (
    <Flex vertical align="center" gap={4}>
      <div className={startAnimation ? getAnimationClass() : ''}>
        <svg
          className={styles.cloudSvg}
          width="100%"
          height="100%"
          viewBox="0 0 120 79"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          style={
            {
              '--primary-color': currentColors.primary,
              '--secondary-color': currentColors.secondary,
            } as React.CSSProperties
          }
        >
          <title>编组</title>
          <defs>
            <radialGradient
              cx="7.97102842%"
              cy="147.556403%"
              fx="7.97102842%"
              fy="147.556403%"
              r="100%"
              gradientTransform="translate(0.0797, 1.4756), scale(0.6579, 1), rotate(90), scale(1, 1.4522), translate(-0.0797, -1.4756)"
              id="radialGradient-1"
            >
              <stop stopColor="#FFFFFF" offset="0%"></stop>
              <stop stopColor="#FFFFFF" offset="0%"></stop>
              <stop
                stopColor={currentColors.secondary}
                offset="61.26327%"
              ></stop>
              <stop
                stopColor={currentColors.primary}
                offset="99.9127581%"
              ></stop>
            </radialGradient>
          </defs>
          <g
            id="终稿"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g id="降本" transform="translate(-1223, -453)">
              <g id="编组" transform="translate(1223, 435)">
                <g transform="translate(0, 18)">
                  <g id="编组-12备份" fill="url(#radialGradient-1)">
                    <path
                      d="M24.7570145,78.9473684 C11.0840929,78.9473684 8.37224981e-16,67.8632755 0,54.1903539 C-1.58939124e-15,41.2119895 9.98659513,30.5661194 22.6944976,29.5180313 C25.9798815,12.6945667 40.7700625,0 58.518668,0 C73.1898421,0 85.8395719,8.67399462 91.6407129,21.1841515 C107.344787,21.4306936 120,34.2662754 120,50.0641849 C120,62.4014585 112.281932,72.9320895 101.420852,77.070892 C98.5032021,78.280061 95.3042014,78.9473684 91.9493427,78.9473684 L24.7570145,78.9473684 Z"
                      id="形状结合"
                    ></path>
                  </g>
                  <text
                    id="存储备份-3"
                    fontFamily="PingFangSC-Regular, PingFang SC"
                    fontSize="14"
                    fontWeight="normal"
                    fill="#FFFFFF"
                  >
                    <tspan x={`${isEnglish() ? '35' : '46'}`} y="56">
                      {$i18n.get({
                        id: 'oceanbase-demo.component.Storage.Storage',
                        dm: '存储',
                      })}
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </Flex>
  )
}

export default Cloud
