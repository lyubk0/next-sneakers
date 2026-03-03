import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const response = NextResponse.next()

	let guestId = request.cookies.get('guestId')?.value

	if (!guestId) {
		guestId = crypto.randomUUID()

		response.cookies.set('guestId', guestId, {
			maxAge: 60 * 60 * 24 * 30,
			path: '/',
		})
	}

	const session = await auth.api.getSession({
		headers: request.headers,
	})

	const isAuthPage =
		pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')

	const isProtectedPage = pathname.startsWith('/profile')

	if (session && isAuthPage) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	if (!session && isProtectedPage) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return response
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
