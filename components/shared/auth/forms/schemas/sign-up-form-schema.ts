import { z } from 'zod'
import { signInSchema } from './sign-in-form-schema'

export const signUpSchema = z.object({
	fullName: z
		.string()
		.nonempty('Full name is required')
		.max(100, 'Full name must not exceed 100 characters'),
	...signInSchema.pick({ email: true, password: true }).shape,
})

export type SignUpFormData = z.infer<typeof signUpSchema>
