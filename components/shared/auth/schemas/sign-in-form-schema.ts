import { z } from 'zod'

export const signInSchema = z.object({
	email: z
		.string()
		.min(1, "Електронна пошта є обов'язковою")
		.email('Невірний формат електронної пошти'),
	password: z
		.string()
		.nonempty("Пароль є обов'язковим")
		.min(8, 'Пароль повинен містити щонайменше 8 символів'),
	rememberMe: z.boolean().optional(),
})

export type SignInFormData = z.infer<typeof signInSchema>
