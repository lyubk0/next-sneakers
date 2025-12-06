import { SignInFormData } from '@/components/shared/auth/forms/schemas/sign-in-form-schema'
import { signIn } from '@/lib/auth-client'
import { useMutation } from '@tanstack/react-query'

export const useSignIn = () => {
	return useMutation({
		mutationFn: async (data: SignInFormData) =>
			await signIn.email({
				email: data.email,
				password: data.password,
				callbackURL: '/',
				rememberMe: data.rememberMe,
			}),
	})
}
