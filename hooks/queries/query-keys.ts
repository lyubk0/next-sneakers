export const queryKeys = {
	// products
	products: () => ['products'] as const,
	productsFiltered: (filters: {
		brandIds?: number[]
		categoryIds?: number[]
	}) => ['products', 'filters', filters] as const,
	product: (id: number) => ['product', id] as const,

	// categories
	categories: () => ['categories'] as const,

	// brands
	brands: () => ['brands'] as const,

	// favorites
	favorites: (userId: string | null) => ['favorites', userId] as const,

	// cart
	cart: (userOrGuestId: string) => ['cart', userOrGuestId] as const,

	// nova poshta
	novaPoshtaCities: (searchString: string) =>
		['nova-poshta', 'cities', searchString] as const,
	novaPoshtaWarehouses: (cityDescription: string, searchString: string) =>
		['nova-poshta', 'warehouses', cityDescription, searchString] as const,
}
