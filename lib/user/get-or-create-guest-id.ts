'use server'

import { randomUUID } from 'crypto'
import { cookies } from 'next/headers'

export const getOrCreateGuestId = async () => {
	const cookieStore = await cookies()
	let guestId = cookieStore.get('guestId')?.value

	if (!guestId) {
		guestId = randomUUID()

		cookieStore.set('guestId', guestId, {
			maxAge: 60 * 60 * 24 * 30, // 30 дней
			path: '/',
		})
	}
	return guestId
}
