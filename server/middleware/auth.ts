import { verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event)
  const method = event.node.req.method
  const url = event.node.req.url

  // const rawToken = getHeader(event, 'authorization')?.replace('Bearer ', '')

  // if (!rawToken) {
  //   throw createError({ statusCode: 401, message: 'Missing token' })
  // }

  // try {
  //   const user = verifyToken(rawToken)
  //   event.context.user = user
  // } catch (err) {
  //   throw createError({ statusCode: 401, message: 'Invalid token' })
  // }
})
