// server/utils/auth.ts
import jwt from 'jsonwebtoken'
import { setCookie, getCookie, H3Event } from 'h3'

type LightUser = {
  id: string
  username: string
}

export function signToken(user: LightUser) {
  const config = useRuntimeConfig()
  const secret = String(config.jwtSecret)
  return jwt.sign({ sub: user.id, username: user.username }, secret as jwt.Secret, {
    expiresIn: config.jwtExpiresIn || '1h'
  } as jwt.SignOptions)
}

export function setTokenCookie(event: H3Event, token: string) {
  setCookie(event, 'token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 3600
  })
}

/**
 * Возвращает userId из токена либо null.
 * useRuntimeConfig вызываем внутри функции.
 */
export function getUserIdFromToken(event: H3Event): string | null {
  const token = getCookie(event, 'token')
  if (!token) return null
  const config = useRuntimeConfig()
  try {
    const payload = jwt.verify(token, String(config.jwtSecret)) as { sub: string }
    return payload.sub
  } catch {
    return null
  }
}
