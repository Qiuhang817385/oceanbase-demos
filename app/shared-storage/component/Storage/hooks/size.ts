import {
  MYSQL_RESPONSIVE_SIZE,
  OB_INSTANCE_RESPONSIVE_SIZE,
  OB_TENANT_RESPONSIVE_SIZE,
} from '@/app/shared-storage/constant/responsive'
import { useEffect, useMemo, useState } from 'react'
import { useResponsive } from 'ahooks'

export const useSize = (
  dbType: 'mysql' | 'oinstance' | 'otenant',
  bizType?: 'core' | 'small' | 'edge',
  containerRef?: React.RefObject<HTMLElement> // 新增容器引用参数
) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const responsive = useResponsive()

  const size = useMemo(() => {
    if (responsive?.large) return 'large'
    if (responsive?.middle) return 'middle'
    if (responsive?.small) return 'small'
    return 'large'
  }, [responsive])

  const styleConfig = useMemo(() => {
    if (dbType === 'mysql')
      return MYSQL_RESPONSIVE_SIZE[size][bizType as 'core' | 'small' | 'edge']
    if (dbType === 'otenant')
      return OB_TENANT_RESPONSIVE_SIZE[size][
        bizType as 'core' | 'small' | 'edge'
      ]
    if (dbType === 'oinstance') return OB_INSTANCE_RESPONSIVE_SIZE[size]
  }, [dbType, bizType])

  const resize = () => {
    const { multiply } = styleConfig as { multiply: number[] }
    const [wm, hm] = multiply

    // 优先使用容器尺寸，否则回退到 document.body
    const container = containerRef?.current || document.body
    const { offsetWidth, offsetHeight } = container

    setWidth(offsetWidth / wm)
    setHeight(offsetHeight / hm)
  }

  useEffect(() => {
    window.addEventListener('resize', resize)
    resize()

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [containerRef?.current]) // 添加容器依赖

  return { width, height, gap: styleConfig?.gap }
}
