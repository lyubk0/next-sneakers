import { SignInFormData } from '@/components/shared/auth/forms/schemas/sign-in-form-schema'
import { SignUpFormData } from '@/components/shared/auth/forms/schemas/sign-up-form-schema'
import { signIn, signOut, signUp } from '@/lib/auth-client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useSignIn = () => {
	return useMutation({
		mutationFn: async (data: SignInFormData) => {
			const result = await signIn.email({
				email: data.email,
				password: data.password,
				callbackURL: '/',
				rememberMe: data.rememberMe,
			})

			if (result.error) {
				throw result.error
			}

			return result.data
		},
	})
}

export const useSignUp = () => {
	const router = useRouter()
	return useMutation({
		mutationFn: async (data: SignUpFormData) =>
			await signUp.email({
				name: data.fullName,
				email: data.email,
				password: data.password,
				callbackURL: '/',
			}),
		onSuccess: () => {
			router.push('/')
		},
	})
}

export const useSignOut = () => {
	const router = useRouter()
	return useMutation({
		mutationFn: async () => {
			await signOut()
		},
		onSuccess: () => {
			router.refresh()
		},
	})
}
