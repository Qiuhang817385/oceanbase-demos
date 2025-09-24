import {
  CubeData,
  ESC_SIZE,
  OB_SIZE,
} from '@/app/shared-storage/constant/mockData'
import { useEffect, useMemo, useRef, useState } from 'react'

export const useInstance = (companySize: string) => {
  const [cores, setCores] = useState<CubeData[]>([])
  const [smalls, setSmalls] = useState<CubeData[]>([])
  const [edges, setEdges] = useState<CubeData[]>([])
  const [obCluster, setOBCluster] = useState<CubeData | null>(null)

  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const timer = useRef<NodeJS.Timeout | null>(null)

  const obCores = useMemo(
    () =>
      OB_SIZE.tenant.filter(
        (cube) => cube.companySize === companySize && cube.type === 'core'
      ),
    [companySize]
  )
  const obSmalls = useMemo(
    () =>
      OB_SIZE.tenant.filter(
        (cube) => cube.companySize === companySize && cube.type === 'small'
      ),
    [companySize]
  )
  const obEdges = useMemo(
    () =>
      OB_SIZE.tenant.filter(
        (cube) => cube.companySize === companySize && cube.type === 'edge'
      ),
    [companySize]
  )

  useEffect(() => {
    return () => clearInterval(timer.current as NodeJS.Timeout)
  }, [])

  useEffect(() => {
    clearInterval(timer.current as NodeJS.Timeout)
    const nextCores = ESC_SIZE.mysql
      .filter(
        (config) => config.companySize === companySize && config.type === 'core'
      )
      .map((core) => ({ ...core, percent: 0, max: core.percent }))

    const nextSmalls = ESC_SIZE.mysql
      .filter(
        (config) =>
          config.companySize === companySize && config.type === 'small'
      )
      .map((core) => ({ ...core, percent: 0, max: core.percent }))

    const nextEdges = ESC_SIZE.mysql
      .filter(
        (config) => config.companySize === companySize && config.type === 'edge'
      )
      .map((core) => ({ ...core, percent: 0, max: core.percent }))

    const obCluster = OB_SIZE.cluster.find(
      (cube) => cube.companySize === companySize
    ) as CubeData

    animate(nextCores, nextSmalls, nextEdges, {
      ...obCluster,
      percent: 0,
      max: obCluster?.percent,
    })
  }, [companySize])

  const animate = (
    cube1: CubeData[],
    cube2: CubeData[],
    cube3: CubeData[],
    cube4: CubeData
  ) => {
    const times = 30
    const interval = 60

    setLoaded(false)
    setLoading(true)

    let index = 0
    timer.current = setInterval(() => {
      if (index < times) {
        setCores(
          cube1.map((cube) => ({
            ...cube,
            percent: Math.ceil(((cube.max as number) / times) * index),
          }))
        )
        setSmalls(
          cube2.map((cube) => ({
            ...cube,
            percent: Math.ceil(((cube.max as number) / times) * index),
          }))
        )
        setEdges(
          cube3.map((cube) => ({
            ...cube,
            percent: Math.ceil(((cube.max as number) / times) * index),
          }))
        )
        setOBCluster({
          ...cube4,
          percent: parseFloat(
            (((cube4.max as number) / times) * index).toFixed(2)
          ),
        })
        index += 1
      } else {
        clearInterval(timer.current as NodeJS.Timeout)
        setLoaded(true)
        setLoading(false)
      }
    }, interval)
  }

  return {
    cores,
    smalls,
    edges,
    obCores,
    obSmalls,
    obEdges,
    obCluster,
    loaded,
    loading,
  }
}
