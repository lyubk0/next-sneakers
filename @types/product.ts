import { product, sexEnum } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'
import { Size } from './size'

export type Product = InferSelectModel<typeof product> & {
	sizes: Size[]
	isFavorite?: boolean
}

export type Sex = (typeof sexEnum.enumValues)[number]
