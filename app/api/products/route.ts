import { Product } from '@/@types/product.types'
import { Sex } from '@/constants/product.constants'
import { SortValue } from '@/constants/sort.constants'
import { ApiServer } from '@/services/api-server'
import { NextRequest, NextResponse } from 'next/server'

const DEFAULT_LIMIT = 8

export interface GetAllProductsApiResponse {
	items: Product[]
	pagination: {
		page: number
		limit: number
		total: number
		totalPages: number
		hasNextPage: boolean
		hasPrevPage: boolean
	}
}

export async function GET(req: NextRequest) {
	const url = new URL(req.url)

	return NextResponse.json(
		await ApiServer.product.getProducts({
			page: Math.max(1, Number(url.searchParams.get('page')) || 1),
			limit: Number(url.searchParams.get('limit')) || undefined,
			sort: (url.searchParams.get('sort') as SortValue) ?? 'recommended',
			brands: url.searchParams.get('brands')?.split(',').map(Number) ?? [],
			sexes: (url.searchParams.get('sex')?.split(',') as Sex[]) ?? [],
			priceFrom: url.searchParams.get('priceFrom')
				? Number(url.searchParams.get('priceFrom'))
				: undefined,
			priceTo: url.searchParams.get('priceTo')
				? Number(url.searchParams.get('priceTo'))
				: undefined,
			sizes: url.searchParams.get('sizes')?.split(',') ?? [],
			colors: url.searchParams.get('colors')?.split(',') ?? [],
		}),
	)
}
