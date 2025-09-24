export interface UVData {
  userId: string
  sessionId: string
  firstVisit: boolean
  visitCount: number
  lastVisitTime: number
  pageViews: number
  sessionDuration: number
  referrer?: string
  userAgent: string
  timestamp: number
}
