import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'

export const cartKeys = {
	all: ['cart'] as const,
}

export const useCart = () => {
	return useQuery({
		queryKey: ['cart'],
		queryFn: () => ApiClient.cart.getCart(),
	})
}
