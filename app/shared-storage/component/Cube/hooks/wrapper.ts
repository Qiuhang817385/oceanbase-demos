import { useEffect, useState } from 'react'

export const useWrapperSize = (
  ref: React.RefObject<HTMLDivElement>,
  ...deps: any
) => {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  const resize = () => {
    setWidth(ref.current?.offsetWidth ?? 0)
    setHeight(ref.current?.offsetHeight ?? 0)
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      resize()
    })
  }, [])

  useEffect(() => {
    resize()
  }, [ref, ...deps])

  return [width, height]
}
