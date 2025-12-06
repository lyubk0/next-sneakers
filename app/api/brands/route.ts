import { db } from '@/db/drizzle'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const brands = await db.query.brand.findMany()

		return NextResponse.json(brands)
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
