import { createLoader, parseAsString } from 'nuqs/server'

export const productOptionsSearchParams = {
	color: parseAsString.withDefault('Чорний'),
}

export const loadProductOptionsSearchParams = createLoader(
	productOptionsSearchParams
)
