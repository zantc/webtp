import { verifyToken } from '~/server/utils/jwt'
import type { H3Event } from 'h3'

interface ApiOptions {
  auth?: boolean // Có yêu cầu xác thực không
}

export function apiServer(
  handler: (event: H3Event) => any | Promise<any>,
  options: ApiOptions = {}
) {
  return defineEventHandler(async (event) => {
    const method = event.node.req.method
    const url = event.node.req.url
    const ip = getRequestIP(event)
    console.log(`[${method}] ${url} - IP: ${ip}`)

    if (options.auth) {
      const rawToken = getHeader(event, 'authorization')?.replace('Bearer ', '')

      if (!rawToken) {
        throw createError({ statusCode: 401, message: 'Missing token' })
      }

      try {
        const user = verifyToken(rawToken)
        event.context.user = user
      } catch {
        throw createError({ statusCode: 401, message: 'Invalid token' })
      }
    }
    return handler(event)
  })
}