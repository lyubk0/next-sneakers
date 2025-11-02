import { SignUpFormData } from '@/components/shared/auth/schemas/sign-up-form-schema'
import { signUp } from '@/lib/auth-client'
import { useMutation } from '@tanstack/react-query'

export const useSignUp = () => {
	return useMutation({
		mutationFn: async (data: SignUpFormData) =>
			await signUp.email({
				name: data.fullName,
				email: data.email,
				password: data.password,
				callbackURL: "/"
			}),
	})
}
