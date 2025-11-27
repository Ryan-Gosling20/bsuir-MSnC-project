import { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { readBody, setCookie } from 'h3'
import { createUser, findUserByUsername, findUserByEmail } from '../utils/users'

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function parseDate(dateStr: string): Date | null {
    const d = new Date(dateStr)
    return isNaN(d.getTime()) ? null : d
}

function yearsBetween(d1: Date, d2: Date) {
    return Math.floor((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
}

export default defineEventHandler(async (event) => {
    const body = (await readBody(event)) as Record<string, any> | null
    const username = String(body?.username ?? '').trim()
    const email = String(body?.email ?? '').trim().toLowerCase()
    const password = String(body?.password ?? '')
    const birthdate = String(body?.birthdate ?? '').trim()

    if (!username || !email || !password || !birthdate) {
        throw createError({ statusCode: 400, statusMessage: 'Required fields: username, email, password, birthdate' })
    }

    if (!isValidEmail(email)) throw createError({ statusCode: 400, statusMessage: 'Invalid email' })
    if (password.length < 8) throw createError({ statusCode: 400, statusMessage: 'Password must be at least 8 chars' })

    const bd = parseDate(birthdate)
    if (!bd) throw createError({ statusCode: 400, statusMessage: 'Invalid birthdate format' })

    const age = yearsBetween(new Date(), bd)
    if (age < 13) throw createError({ statusCode: 400, statusMessage: 'You must be at least 13 years old' })

    if (findUserByUsername(username)) throw createError({ statusCode: 409, statusMessage: 'Username already taken' })
    if (findUserByEmail(email)) throw createError({ statusCode: 409, statusMessage: 'Email already registered' })

    const passwordHash = await hash(password, 10)

    const user = createUser({
        id: crypto.randomUUID(),
        username,
        email,
        passwordHash,
        birthdate: bd.toISOString().slice(0, 10),
        createdAt: new Date().toISOString()
    })

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

    event.node.res.statusCode = 201
    return { id: user.id, username: user.username, email: user.email }
})
