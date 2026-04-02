import { size } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'

export type Size = InferSelectModel<typeof size>
