// app/components/AnalyticsProvider.tsx
'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  useAnalytics,
  useMaterializedViewAnalytics,
  useSharedStorageAnalytics,
} from '../hooks/useAnalytics'

interface AnalyticsContextType {
  trackPageView: (
    pageName: string,
    pagePath: string,
    additionalData?: Record<string, any>
  ) => void
  trackEvent: (eventName: string, parameters?: Record<string, any>) => void
  trackUserInteraction: (interaction: any) => void
  trackBusinessMetric: (metric: any) => void
  trackPerformanceMetric: (metric: any) => void
  trackError: (
    errorType: string,
    errorMessage: string,
    errorStack?: string,
    context?: string
  ) => void
  trackUserJourney: (step: string, stepData?: Record<string, any>) => void
  trackConversion: (
    conversionType: string,
    value?: number,
    currency?: string
  ) => void
  trackSearch: (
    searchTerm: string,
    resultsCount?: number,
    category?: string
  ) => void
  trackDownload: (
    fileName: string,
    fileType?: string,
    fileSize?: number
  ) => void
  setUserProperties: (properties: Record<string, any>) => void
  setSessionProperties: (properties: Record<string, any>) => void
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null)

interface AnalyticsProviderProps {
  children: ReactNode
  analyticsType: 'materialized-view' | 'shared-storage'
}

export function AnalyticsProvider({
  children,
  analyticsType,
}: AnalyticsProviderProps) {
  const analytics =
    analyticsType === 'materialized-view'
      ? useMaterializedViewAnalytics()
      : useSharedStorageAnalytics()

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error(
      'useAnalyticsContext must be used within an AnalyticsProvider'
    )
  }
  return context
}
