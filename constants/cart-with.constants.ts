export const CART_WITH = {
	items: {
		orderBy: (items: any, { desc }: any) => [desc(items.created_at)],
		with: {
			product: {
				with: {
					sizes: true,
				},
			},
			size: true,
		},
	},
} as const
