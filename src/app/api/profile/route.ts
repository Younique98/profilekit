import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/db'
import { profile } from '@/db/schema/profile'
import { eq } from 'drizzle-orm'
import { profileSchema } from '@/lib/validation'
import * as yup from 'yup'
import { getCurrentUser } from '@/lib/session'

// This route serves ProfileKit's single, global profile row (id = 1) —
// there is no multi-tenant data model, so there is no cross-user IDOR
// surface here: every request reads or writes the same one record.
//
// GET is intentionally open: the profile view is meant to be public, the
// same way a portfolio page is. POST requires a real, authenticated
// session (see src/lib/auth.ts) — only the signed-in owner can write.

// GET handler - fetch current profile (public)
export async function GET() {
    try {
        const result = await db.select().from(profile).where(eq(profile.id, 1)) // assuming static id = 1
        return NextResponse.json(result[0])
    } catch (error) {
        console.error('Failed to load profile:', error)
        return NextResponse.json(
            { error: 'Failed to load profile' },
            { status: 500 }
        )
    }
}

// POST handler - update profile (owner only)
export async function POST(req: NextRequest) {
    const user = await getCurrentUser()
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await req.json()
        const validated = await profileSchema.validate(body, {
            abortEarly: false,
        })

        await db.update(profile).set(validated).where(eq(profile.id, 1)) // single user for now

        return NextResponse.json({ success: true })
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            // Safe to return to the client: this only ever describes which
            // submitted fields failed validation, never internal state.
            return NextResponse.json(
                { error: 'Invalid input', details: error.errors },
                { status: 400 }
            )
        }

        console.error('Failed to update profile:', error)
        return NextResponse.json(
            { error: 'Failed to update profile' },
            { status: 500 }
        )
    }
}
