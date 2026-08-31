import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/db'
import { profile } from '@/db/schema/profile'
import { eq } from 'drizzle-orm'
import { profileSchema } from '@/lib/validation'

// GET handler - fetch current profile
export async function GET() {
    try {
        const result = await db.select().from(profile).where(eq(profile.id, 1)) // assuming static id = 1
        return NextResponse.json(result[0])
    } catch (error) {
        return NextResponse.json(
            { error: error ? error : 'Failed to load profile' },
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
        console.error('Validation or DB error:', error)
        return NextResponse.json(
            {
                error: 'Invalid Input',
                details: (error as Error)?.message || error,
            },
            { status: 500 }
        )
    }
}
