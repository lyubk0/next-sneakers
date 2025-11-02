import { db } from '@/db/drizzle'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const categories = await db.query.category.findMany()

		return NextResponse.json(categories)
	} catch (error) {
		console.error('API Error:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{
				status: 500,
			}
		)
	}
}
