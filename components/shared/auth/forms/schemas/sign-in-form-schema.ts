import { z } from 'zod'

export const signInSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.pipe(z.email({ message: 'Invalid email format' })),

	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must be at least 8 characters long')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number'),

	rememberMe: z.boolean().optional(),
})

export type SignInFormData = z.infer<typeof signInSchema>
