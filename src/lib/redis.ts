import Redis from 'ioredis'

export const CACHE_PREFIX = 'FALP_'

let client: Redis | null = null

function getRedisClient(): Redis | null {
  if (!process.env.REDIS_URL) return null
  if (client) return client
  client = new Redis(process.env.REDIS_URL, {
    password: process.env.REDIS_PASSWORD || undefined,
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    connectTimeout: 2000,
  })
  client.on('error', (err) => console.warn('[Redis] error:', err.message))
  return client
}

export async function withCache<T>(key: string, ttl: number, fn: () => Promise<T>): Promise<T> {
  const redis = getRedisClient()
  const prefixedKey = `${CACHE_PREFIX}${key}`
  if (redis) {
    try {
      const cached = await redis.get(prefixedKey)
      if (cached) return JSON.parse(cached) as T
    } catch {
      /* fallback */
    }
  }
  const result = await fn()
  if (redis) {
    try {
      await redis.set(prefixedKey, JSON.stringify(result), 'EX', ttl)
    } catch {
      /* ignore */
    }
  }
  return result
}

/**
 * Delete all keys matching FALP_* using SCAN (safe for production).
 * Returns the number of deleted keys.
 */
export async function deleteByPrefix(): Promise<number> {
  const redis = getRedisClient()
  if (!redis) return 0

  let cursor = '0'
  let deleted = 0

  do {
    const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', `${CACHE_PREFIX}*`, 'COUNT', 100)
    cursor = nextCursor
    if (keys.length > 0) {
      await redis.del(...keys)
      deleted += keys.length
    }
  } while (cursor !== '0')

  return deleted
}
