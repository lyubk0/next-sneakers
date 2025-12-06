import { z } from 'zod'
import { signInSchema } from './sign-in-form-schema'

export const signUpSchema = z.object({
	fullName: z
		.string()
		.nonempty("Ім'я є обов'язковим")
		.max(100, "Ім'я не повинно перевищувати 100 символів"),
	...signInSchema.pick({ email: true, password: true }).shape,
})

export type SignUpFormData = z.infer<typeof signUpSchema>
