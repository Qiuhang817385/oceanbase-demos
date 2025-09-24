'use client'
import { useState, useEffect, useRef } from 'react'
import { useInterval } from 'ahooks'

const CapacityCount = ({ isUpScene }: { isUpScene: boolean }) => {
  const [upCapacity, setUpCapacity] = useState(50)
  const [downCapacity, setDownCapacity] = useState(100)

  useInterval(
    () => {
      const randomIncrement = 1 // 1-5之间的随机数
      setUpCapacity(Math.min(upCapacity + randomIncrement, 100))
    },
    upCapacity < 100 && isUpScene ? 70 : undefined,
    {
      immediate: false,
    }
  )

  useInterval(
    () => {
      const randomIncrement = 1 // 1-5之间的随机数
      setDownCapacity(Math.max(downCapacity - randomIncrement, 50))
    },
    downCapacity > 50 && !isUpScene ? 70 : undefined,
    {
      immediate: false,
    }
  )

  return <>{isUpScene ? upCapacity : downCapacity} T</>
}

export default CapacityCount
