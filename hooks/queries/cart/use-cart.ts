import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'

export const useCart = () => {
	return useQuery({
		queryKey: ['cart'],
		queryFn: () => ApiClient.cart.getCart(),
		refetchOnWindowFocus: false,
	})
}
