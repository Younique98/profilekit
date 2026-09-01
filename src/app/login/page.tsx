import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from '@/components/LoginForm'

export const metadata: Metadata = {
    title: 'Log in',
    description: 'Log in to edit your ProfileKit profile.',
    alternates: {
        canonical: '/login',
    },
    robots: {
        index: false,
        follow: false,
    },
}

export default function LoginPage() {
    return (
        <main className="p-4">
            <Suspense
                fallback={
                    <p className="text-center mt-10" role="status">
                        Loading…
                    </p>
                }
            >
                <LoginForm />
            </Suspense>
        </main>
    )
}
