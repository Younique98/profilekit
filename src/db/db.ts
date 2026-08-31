import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

if (!process.env.DATABASE_URL || !process.env.DATABASE_AUTH_TOKEN) {
    throw new Error(
        'Environment variables DATABASE_URL and DATABASE_AUTH_TOKEN must be defined'
    )
}

const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
})

export const db = drizzle(client)
