import { z } from 'zod'

export const signInSchema = z.object({
	email: z.email({ message: 'Invalid email format' }),
	password: z
		.string()
		.nonempty('Password is required')
		.min(8, 'Password must be at least 8 characters long'),
	rememberMe: z.boolean().optional(),
})

export type SignInFormData = z.infer<typeof signInSchema>
