import { db } from '@/db/drizzle'
import { size } from '@/db/schema'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const sizes = await db
			.selectDistinct({ value: size.eur_size })
			.from(size)
			.orderBy(size.eur_size)

		return NextResponse.json(
			sizes.map(size => size.value),
			{ status: 200 },
		)
	} catch (error) {
		console.error('API Error:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		)
	}
}
