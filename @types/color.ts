import { color } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'

export type Color = InferSelectModel<typeof color>
