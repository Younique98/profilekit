import type { Metadata } from 'next'
import { View } from '@/components/View'

export const metadata: Metadata = {
    title: 'Profile',
    description:
        'View a live, editable profile built with ProfileKit — a full-stack Next.js and Drizzle ORM demo showing how a real profile page reads and writes to a relational database.',
    alternates: {
        canonical: '/',
    },
}

export default function Home() {
    return (
        <main className="p-4">
            <div className="max-w-xl mx-auto mt-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    ProfileKit
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    A live profile viewer built with Next.js and Drizzle ORM.
                    The details below are read straight from the database —
                    edit them anytime and the change saves instantly.
                </p>
            </div>
            <View />
        </main>
    )
}
