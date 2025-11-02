import { createLoader, parseAsString } from 'nuqs/server'

export const filtersSearchParams = {
	category: parseAsString.withDefault('Кросівки'),
}

export const loadSearchParams = createLoader(filtersSearchParams)
