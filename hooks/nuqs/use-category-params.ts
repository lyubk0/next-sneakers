import { useQueryState } from 'nuqs'

export const useCategoryParams = () => {
	return useQueryState('category', {
		defaultValue: 'Кросівки',
	})
}
