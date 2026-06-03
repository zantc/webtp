import jwt from 'jsonwebtoken'

const SECRET_KEY = useRuntimeConfig().jwtSecret || 'your-default-secret'

export function signToken(payload: object, expiresIn: jwt.SignOptions['expiresIn'] = '1d'): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

export function verifyToken<T = any>(token: string): T {
  try {
    return jwt.verify(token, SECRET_KEY) as T
  } catch (error) {
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }
}
