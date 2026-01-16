import { db } from '@/db/drizzle'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const colors = await db.query.color.findMany()

		return NextResponse.json(colors, { status: 200 })
	} catch (error) {
		console.error('API Error:', error)

		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
