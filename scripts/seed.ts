import 'dotenv/config'
import { db } from '@/db/db'
import { profile } from '@/db/schema/profile'
import { eq } from 'drizzle-orm'

async function seed() {
    const existing = await db.select().from(profile).where(eq(profile.id, 1))

    if (existing.length > 0) {
        console.log('Profile already seeded.')
        return
    }

    await db.insert(profile).values({
        id: 1,
        name: 'Erica Thompson',
        location: 'Toronto, Canada',
        image_url: 'https://picsum.photos/200/300',
        headline: 'Engineer & Mentor',
        bio: 'I love helping developers grow, building polished UI, and solving meaningful problems.',
    })

    console.log('Profile seeded successfully.')
}

seed().catch((err) => {
    console.error('Seeding failed:', err)
    process.exit(1)
})
