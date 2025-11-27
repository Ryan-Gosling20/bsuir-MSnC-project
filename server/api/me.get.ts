import jwt from 'jsonwebtoken'
import { getCookie } from 'h3'
import { findUserByUsername } from '../utils/users'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const secret = config.jwtSecret
    if (!secret) throw createError({ statusCode: 500, statusMessage: 'JWT secret is not configured' })

    const token = getCookie(event, 'token')
    if (!token) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    try {
        const payload = jwt.verify(token as string, secret) as any
        const user = findUserByUsername(payload.username)
        if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

        return { id: user.id, username: user.username }
    } catch (err) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }
})
