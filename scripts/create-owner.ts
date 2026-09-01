import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '@/db/db'
import { users } from '@/db/schema/user'

// ProfileKit is a single-owner tool: one person (the profile's owner)
// signs in to edit the one profile row. There's no public signup route
// on purpose - this script is how the owner account gets created, run
// once by whoever is deploying the app.
//
// Usage:
//   OWNER_EMAIL=you@example.com OWNER_PASSWORD='a real password' npm run create-owner
//
// Safe to re-run: if an account with OWNER_EMAIL already exists, its
// password is updated to OWNER_PASSWORD instead of creating a duplicate.

async function createOwner() {
    const email = process.env.OWNER_EMAIL?.toLowerCase().trim()
    const password = process.env.OWNER_PASSWORD
    const name = process.env.OWNER_NAME?.trim() || 'Owner'

    if (!email || !password) {
        console.error(
            'Set OWNER_EMAIL and OWNER_PASSWORD env vars before running this script.'
        )
        process.exit(1)
    }

    if (password.length < 8) {
        console.error('OWNER_PASSWORD must be at least 8 characters.')
        process.exit(1)
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const existing = await db.select().from(users).where(eq(users.email, email))

    if (existing.length > 0) {
        await db
            .update(users)
            .set({ passwordHash, name })
            .where(eq(users.email, email))
        console.log(`Updated password for existing owner account: ${email}`)
        return
    }

    await db.insert(users).values({ email, passwordHash, name })
    console.log(`Owner account created: ${email}`)
}

createOwner().catch((err) => {
    console.error('Failed to create owner account:', err)
    process.exit(1)
})
