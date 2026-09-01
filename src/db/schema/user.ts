import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

// Single-owner auth: this app has exactly one editable profile (see
// profile.ts) and is meant for one person to sign in and manage it, not
// for public self-registration. This table therefore exists to hold that
// one owner account (seeded via scripts/create-owner.ts), not a general
// user base - there's no signup route.
export const users = sqliteTable('users', {
    id: int().primaryKey({ autoIncrement: true }),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    name: text('name').notNull(),
    createdAt: text('created_at')
        .notNull()
        .$defaultFn(() => new Date().toISOString()),
})
