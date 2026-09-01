import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '@/db/db'
import { users } from '@/db/schema/user'

export const authOptions: AuthOptions = {
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            name: 'Email and password',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const result = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, credentials.email.toLowerCase().trim()))
                const user = result[0]
                if (!user) {
                    return null
                }

                const valid = await bcrypt.compare(
                    credentials.password,
                    user.passwordHash
                )
                if (!valid) {
                    return null
                }

                return {
                    id: String(user.id),
                    email: user.email,
                    name: user.name,
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                // @ts-expect-error - extending the default session user shape
                session.user.id = token.id
            }
            return session
        },
    },
}
