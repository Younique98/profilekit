import type { Metadata } from 'next'
import { Edit } from '@/components/Edit'

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

export default function EditProfilePage() {
    return (
        <main className="p-4">
            <Edit />
        </main>
    )
}
