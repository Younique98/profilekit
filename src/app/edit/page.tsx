import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Edit } from '@/components/Edit'
import { getCurrentUser } from '@/lib/session'

export const metadata: Metadata = {
    title: 'Edit Profile',
    description:
        'Edit your ProfileKit profile — update your name, location, headline, photo, and bio, with live validation and an instant save.',
    alternates: {
        canonical: '/edit',
    },
    robots: {
        index: false,
        follow: false,
    },
}

export default async function EditProfilePage() {
    const user = await getCurrentUser()
    if (!user) {
        redirect('/login?callbackUrl=%2Fedit')
    }

    return (
        <main className="p-4">
            <Edit ownerEmail={user.email} />
        </main>
    )
}
