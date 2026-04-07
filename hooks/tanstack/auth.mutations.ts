import { SignInFormData } from '@/components/shared/auth/forms/schemas/sign-in-form-schema'
import { SignUpFormData } from '@/components/shared/auth/forms/schemas/sign-up-form-schema'
import { signIn, signOut, signUp } from '@/lib/auth-client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

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
				throw new Error(result.error.message || 'Something went wrong')
			}

			return result.data
		},

		onError: (error: any) => {
			const message = error?.message ?? 'Something went wrong'
			toast.error(message)
		},
	})
}

export const useSignUp = () => {
	return useMutation({
		mutationFn: async (data: SignUpFormData) => {
			const result = await signUp.email({
				name: data.fullName,
				email: data.email,
				password: data.password,
			})

			if (result.error) {
				throw new Error(result.error.message)
			}

			return result.data
		},

		onError: (error: Error) => {
			toast.error(error.message ?? 'Something went wrong')
		},

		onSuccess: () => {
			toast.success('Please check your email to verify your account')
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
