import { auth } from '@/lib/auth' // путь к твоему better-auth instance
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const session = await auth.api.getSession({
		headers: await headers(),
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

	return NextResponse.next()
}

export const config = {
	runtime: 'nodejs',
	matcher: ['/sign-in', '/sign-up', '/profile/:path*'],
}
