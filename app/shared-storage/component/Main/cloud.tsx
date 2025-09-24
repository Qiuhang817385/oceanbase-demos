import { Flex } from 'antd'
import React from 'react'

interface IProps {}

export default function Cloud({}: IProps) {
  return (
    <Flex vertical align="center" gap={4}>
      <div>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 120 79"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
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
              <stop stop-color="#FFFFFF" offset="0%"></stop>
              <stop stop-color="#FFFFFF" offset="0%"></stop>
              <stop stop-color="#66A5F6" offset="61.26327%"></stop>
              <stop stop-color="#0181FD" offset="99.9127581%"></stop>
            </radialGradient>
          </defs>
          <g
            id="终稿"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
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
                    font-family="PingFangSC-Regular, PingFang SC"
                    font-size="14"
                    font-weight="normal"
                    fill="#FFFFFF"
                  >
                    <tspan x="46" y="56">
                      存储
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
