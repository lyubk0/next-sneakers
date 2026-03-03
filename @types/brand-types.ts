import { brand } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'

export type Brand = InferSelectModel<typeof brand>
