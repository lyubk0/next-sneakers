'use client'

import { signOut } from '@/lib/auth-client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

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
