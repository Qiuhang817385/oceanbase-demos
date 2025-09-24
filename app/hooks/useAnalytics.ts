// app/hooks/useAnalytics.ts
import { useEffect, useCallback, useRef } from 'react'
import {
  materializedViewGA,
  sharedStorageGA,
  GAEnhanced,
  UserInteractionEvent,
  BusinessMetricEvent,
  PerformanceMetricEvent,
} from '../utils/ga-enhanced'

export function useAnalytics(gaInstance: GAEnhanced) {
  const sessionStartTime = useRef<number>(Date.now())

  // 页面浏览跟踪
  const trackPageView = useCallback(
    (
      pageName: string,
      pagePath: string,
      additionalData?: Record<string, any>
    ) => {
      gaInstance.trackPageView(pageName, pagePath, additionalData)
    },
    [gaInstance]
  )

  // 事件跟踪
  const trackEvent = useCallback(
    (eventName: string, parameters?: Record<string, any>) => {
      gaInstance.trackEvent(eventName, parameters)
    },
    [gaInstance]
  )

  // 用户交互跟踪
  const trackUserInteraction = useCallback(
    (interaction: UserInteractionEvent) => {
      gaInstance.trackUserInteraction(interaction)
    },
    [gaInstance]
  )

  // 业务指标跟踪
  const trackBusinessMetric = useCallback(
    (metric: BusinessMetricEvent) => {
      gaInstance.trackBusinessMetric(metric)
    },
    [gaInstance]
  )

  // 性能指标跟踪
  const trackPerformanceMetric = useCallback(
    (metric: PerformanceMetricEvent) => {
      gaInstance.trackPerformanceMetric(metric)
    },
    [gaInstance]
  )

  // 错误跟踪
  const trackError = useCallback(
    (
      errorType: string,
      errorMessage: string,
      errorStack?: string,
      context?: string
    ) => {
      gaInstance.trackError(errorType, errorMessage, errorStack, context)
    },
    [gaInstance]
  )

  // 用户行为序列跟踪
  const trackUserJourney = useCallback(
    (step: string, stepData?: Record<string, any>) => {
      gaInstance.trackUserJourney(step, stepData)
    },
    [gaInstance]
  )

  // 转化跟踪
  const trackConversion = useCallback(
    (conversionType: string, value?: number, currency?: string) => {
      gaInstance.trackConversion(conversionType, value, currency)
    },
    [gaInstance]
  )

  // 搜索跟踪
  const trackSearch = useCallback(
    (searchTerm: string, resultsCount?: number, category?: string) => {
      gaInstance.trackSearch(searchTerm, resultsCount, category)
    },
    [gaInstance]
  )

  // 下载跟踪
  const trackDownload = useCallback(
    (fileName: string, fileType?: string, fileSize?: number) => {
      gaInstance.trackDownload(fileName, fileType, fileSize)
    },
    [gaInstance]
  )

  // 设置用户属性
  const setUserProperties = useCallback(
    (properties: Record<string, any>) => {
      gaInstance.setUserProperties(properties)
    },
    [gaInstance]
  )

  // 设置会话属性
  const setSessionProperties = useCallback(
    (properties: Record<string, any>) => {
      gaInstance.setSessionProperties(properties)
    },
    [gaInstance]
  )

  // 页面卸载时跟踪会话时长
  useEffect(() => {
    const handleBeforeUnload = () => {
      const sessionDuration = Date.now() - sessionStartTime.current
      trackPerformanceMetric({
        metricName: 'session_duration',
        value: sessionDuration,
        unit: 'ms',
        context: 'page_unload',
      })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [trackPerformanceMetric])

  return {
    trackPageView,
    trackEvent,
    trackUserInteraction,
    trackBusinessMetric,
    trackPerformanceMetric,
    trackError,
    trackUserJourney,
    trackConversion,
    trackSearch,
    trackDownload,
    setUserProperties,
    setSessionProperties,
  }
}

// 为不同路由导出的便捷 hooks
export const useMaterializedViewAnalytics = () =>
  useAnalytics(materializedViewGA)
export const useSharedStorageAnalytics = () => useAnalytics(sharedStorageGA)
