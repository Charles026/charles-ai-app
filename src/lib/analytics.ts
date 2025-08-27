export function trackPageEvent(event: string, label?: string) {
  if (process.env.NODE_ENV !== 'production') return
  try {
    // placeholder
    console.debug('[analytics] page', event, label)
  } catch {}
}

export function trackUserEvent(event: string, label?: string) {
  if (process.env.NODE_ENV !== 'production') return
  try {
    console.debug('[analytics] user', event, label)
  } catch {}
}

export function trackChatEvent(event: string, data?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== 'production') return
  try {
    console.debug('[analytics] chat', event, data)
  } catch {}
}

export function trackUserQuery(query: string, source?: string) {
  if (process.env.NODE_ENV !== 'production') return
  try {
    console.debug('[analytics] query', { query, source })
  } catch {}
}

