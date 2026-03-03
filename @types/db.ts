import { db } from '@/db/drizzle'

export type Db = typeof db
export type Tx = Parameters<Db['transaction']>[0] extends (tx: infer T) => any
	? T
	: never
