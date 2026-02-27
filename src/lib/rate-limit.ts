interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5', 10)
const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10) // 1 minute

export function rateLimit(ip: string): { success: boolean; remaining: number } {
  const now = Date.now()
  const key = ip

  // Clean up expired entries
  if (store[key] && store[key].resetTime < now) {
    delete store[key]
  }

  if (!store[key]) {
    store[key] = {
      count: 1,
      resetTime: now + WINDOW_MS,
    }
    return { success: true, remaining: MAX_REQUESTS - 1 }
  }

  if (store[key].count >= MAX_REQUESTS) {
    return { success: false, remaining: 0 }
  }

  store[key].count++
  return { success: true, remaining: MAX_REQUESTS - store[key].count }
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now()
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  }
}, 60000)
