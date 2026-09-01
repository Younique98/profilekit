import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/db'
import { profile } from '@/db/schema/profile'
import { eq } from 'drizzle-orm'
import { profileSchema } from '@/lib/validation'
import * as yup from 'yup'

// This route serves ProfileKit's single, global profile row (id = 1) —
// there is no user table or session, so there is no cross-user IDOR
// surface here: every request reads or writes the same one record.
//
// SECURITY NOTE (flagged, not fixed here): POST below has no
// authentication, so on a public deployment any visitor who knows this
// endpoint can overwrite the displayed profile directly via the API,
// bypassing the UI. Adding real auth (login, session, or a signed admin
// token wired through the /edit form) is a product decision beyond the
// scope of this audit pass and is called out separately for a human
// decision before this app is deployed with a publicly writable
// database.

// GET handler - fetch current profile
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

// POST handler - update profile
export async function POST(req: NextRequest) {
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
