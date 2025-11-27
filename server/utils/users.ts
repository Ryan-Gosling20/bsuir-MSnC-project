export type User = {
    id: string
    username: string
    email: string
    passwordHash: string
    birthdate: string
    createdAt: string
}

const usersByUsername = new Map<string, User>()
const usersByEmail = new Map<string, User>()

export function findUserByUsername(username: string): User | null {
    return usersByUsername.get(username) ?? null
}

export function findUserByEmail(email: string): User | null {
    return usersByEmail.get(email) ?? null
}

export function createUser(user: User): User {
    usersByUsername.set(user.username, user)
    usersByEmail.set(user.email, user)
    return user
}
