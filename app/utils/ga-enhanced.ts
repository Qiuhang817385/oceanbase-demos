// app/utils/ga-enhanced.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

// 分析事件类型定义
export interface AnalyticsEvent {
  eventName: string
  parameters?: Record<string, any>
}

export interface UserInteractionEvent {
  action: string
  target: string
  value?: any
  category?: string
  label?: string
}

export interface BusinessMetricEvent {
  metricName: string
  value: number
  unit?: string
  category?: string
}

export interface PerformanceMetricEvent {
  metricName: string
  value: number
  unit?: string
  context?: string
}

export class GAEnhanced {
  private gaId: string
  private isInitialized: boolean = false

  constructor(gaId: string) {
    this.gaId = gaId
    this.initializeGA()
  }

  // 初始化 GA
  private initializeGA() {
    if (typeof window !== 'undefined') {
      this.isInitialized = true
    }
  }

  // 检查 GA 是否可用
  private isGAAvailable(): boolean {
    return this.isInitialized && typeof window !== 'undefined' && !!window.gtag
  }

  // 自定义事件跟踪
  public trackEvent(eventName: string, parameters?: Record<string, any>) {
    if (this.isGAAvailable()) {
      window.gtag('event', eventName, {
        send_to: this.gaId,
        ...parameters,
      })
    }
  }

  // 用户交互跟踪
  public trackUserInteraction(interaction: UserInteractionEvent) {
    this.trackEvent('user_interaction', {
      action: interaction.action,
      target: interaction.target,
      value: interaction.value,
      category: interaction.category || 'user_action',
      label: interaction.label,
      timestamp: new Date().toISOString(),
    })
  }

  // 业务指标跟踪
  public trackBusinessMetric(metric: BusinessMetricEvent) {
    this.trackEvent('business_metric', {
      metric_name: metric.metricName,
      metric_value: metric.value,
      metric_unit: metric.unit || 'count',
      category: metric.category || 'business',
      timestamp: new Date().toISOString(),
    })
  }

  // 性能指标跟踪
  public trackPerformanceMetric(metric: PerformanceMetricEvent) {
    this.trackEvent('performance_metric', {
      metric_name: metric.metricName,
      metric_value: metric.value,
      metric_unit: metric.unit || 'ms',
      context: metric.context || 'page',
      timestamp: new Date().toISOString(),
    })
  }

  // 页面浏览增强
  public trackPageView(
    pageName: string,
    pagePath: string,
    additionalData?: Record<string, any>
  ) {
    if (this.isGAAvailable()) {
      window.gtag('config', this.gaId, {
        page_title: pageName,
        page_location: window.location.href,
        page_path: pagePath,
        ...additionalData,
      })
    }
  }

  // 错误跟踪
  public trackError(
    errorType: string,
    errorMessage: string,
    errorStack?: string,
    context?: string
  ) {
    this.trackEvent('error_occurred', {
      error_type: errorType,
      error_message: errorMessage,
      error_stack: errorStack,
      context: context || 'unknown',
      timestamp: new Date().toISOString(),
    })
  }

  // 用户行为序列跟踪
  public trackUserJourney(step: string, stepData?: Record<string, any>) {
    this.trackEvent('user_journey', {
      journey_step: step,
      ...stepData,
      timestamp: new Date().toISOString(),
    })
  }

  // 设置用户属性
  public setUserProperties(properties: Record<string, any>) {
    if (this.isGAAvailable()) {
      window.gtag('config', this.gaId, {
        custom_map: properties,
      })
    }
  }

  // 设置会话属性
  public setSessionProperties(properties: Record<string, any>) {
    this.trackEvent('session_properties', properties)
  }

  // 跟踪转化事件
  public trackConversion(
    conversionType: string,
    value?: number,
    currency?: string
  ) {
    this.trackEvent('conversion', {
      conversion_type: conversionType,
      value: value,
      currency: currency || 'USD',
      timestamp: new Date().toISOString(),
    })
  }

  // 跟踪搜索事件
  public trackSearch(
    searchTerm: string,
    resultsCount?: number,
    category?: string
  ) {
    this.trackEvent('search', {
      search_term: searchTerm,
      results_count: resultsCount,
      category: category || 'general',
      timestamp: new Date().toISOString(),
    })
  }

  // 跟踪下载事件
  public trackDownload(fileName: string, fileType?: string, fileSize?: number) {
    this.trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
      file_size: fileSize,
      timestamp: new Date().toISOString(),
    })
  }
}

// 为两个路由创建实例
export const materializedViewGA = new GAEnhanced('G-9F380MRK1S')
export const sharedStorageGA = new GAEnhanced('G-QSQ9BVCX99')

// 便捷方法
export const trackEvent = (
  gaInstance: GAEnhanced,
  eventName: string,
  parameters?: Record<string, any>
) => {
  gaInstance.trackEvent(eventName, parameters)
}

export const trackUserInteraction = (
  gaInstance: GAEnhanced,
  interaction: UserInteractionEvent
) => {
  gaInstance.trackUserInteraction(interaction)
}

export const trackBusinessMetric = (
  gaInstance: GAEnhanced,
  metric: BusinessMetricEvent
) => {
  gaInstance.trackBusinessMetric(metric)
}

export const trackPerformanceMetric = (
  gaInstance: GAEnhanced,
  metric: PerformanceMetricEvent
) => {
  gaInstance.trackPerformanceMetric(metric)
}
