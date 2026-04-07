import { VerifyEmail } from '@/components/shared/emails/verify-email'
import { db } from '@/db/drizzle'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { APIError, createAuthMiddleware } from 'better-auth/api'
import { eq } from 'drizzle-orm'
import { Resend } from 'resend'
import * as schema from '../db/schema'

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: schema,
	}),

	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
	},

	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},

	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }, request) => {
			try {
				console.log('Sending verification email to:', user.email)
				const result = await resend.emails.send({
					from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
					to: user.email,
					subject: 'Verify your email',
					react: VerifyEmail({ magicLink: url }),
				})

				console.log('Email sent:', result)
			} catch (error) {
				console.error('Email error:', error)
			}
		},
	},

	hooks: {
		before: createAuthMiddleware(async context => {
			if (context.path !== '/sign-up/email') return

			const email = (context.body as { email?: string })?.email
			if (!email) return

			const existingUser = await db.query.user.findFirst({
				where: eq(schema.user.email, email),
			})

			if (existingUser) {
				throw new APIError('UNPROCESSABLE_ENTITY', {
					message: 'This email is already registered. Please sign in instead.',
				})
			}
		}),
	},
})
