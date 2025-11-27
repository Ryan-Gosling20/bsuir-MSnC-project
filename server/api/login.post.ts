import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { readBody, setCookie } from 'h3'
import { findUserByEmail } from '../utils/users'

export default defineEventHandler(async (event) => {
    const body = (await readBody(event)) as Record<string, any> | null
    const email = String(body?.email ?? '').trim().toLowerCase()
    const password = String(body?.password ?? '')

    if (!email || !password) {
        throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
    }

    const user = findUserByEmail(email)
    if (!user) throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })

    const ok = await compare(password, user.passwordHash)
    if (!ok) throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })

    const config = useRuntimeConfig()
    const secret = String(config.jwtSecret)
    const token = jwt.sign({ sub: user.id, username: user.username }, secret as jwt.Secret, {
        expiresIn: config.jwtExpiresIn ?? '1h'
    } as jwt.SignOptions)

    setCookie(event, 'token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60
    })

    return { id: user.id, username: user.username, email: user.email }
})
