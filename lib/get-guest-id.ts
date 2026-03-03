import { cookies } from 'next/headers'

export const getGuestId = async (): Promise<string | undefined> => {
	return (await cookies()).get('guestId')?.value
}
