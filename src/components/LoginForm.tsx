'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

export const LoginForm = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/edit'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSubmitting(true)

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })

        setSubmitting(false)

        if (!result || result.error) {
            setError("That email and password don't match an account.")
            return
        }

        router.push(callbackUrl)
        router.refresh()
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border text-gray-800">
            <h1 className="text-xl font-semibold mb-2">Log in</h1>
            <p className="text-sm text-gray-700 mb-6">
                Sign in as the profile owner to edit your ProfileKit profile.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                    <label
                        htmlFor="login-email"
                        className="block text-sm font-medium text-black mb-1"
                    >
                        Email
                    </label>
                    <input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label
                        htmlFor="login-password"
                        className="block text-sm font-medium text-black mb-1"
                    >
                        Password
                    </label>
                    <input
                        id="login-password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-invalid={error ? 'true' : undefined}
                        aria-describedby={error ? 'login-error' : undefined}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {error && (
                    <p id="login-error" role="alert" className="text-red-700 text-sm">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full disabled:opacity-60"
                >
                    {submitting ? 'Logging in…' : 'Log in'}
                </button>
            </form>
        </div>
    )
}
