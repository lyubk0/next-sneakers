import { useCategoryParams } from '@/hooks/nuqs'
import { ApiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'

export const useProducts = () => {
	const [category] = useCategoryParams()
	return useQuery({
		queryKey: ['products', category],
		queryFn: async () => {
			return await ApiClient.product.getAllByCategory({ category })
		},
	})
}
