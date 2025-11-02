import { favorite } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'

export type Favorite = InferSelectModel<typeof favorite>
