import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import isRateLimited from './lib/ratelimit'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function middleware(request: NextRequest) {
	if (await isRateLimited(300, 60 * 1000)) {
		return NextResponse.json({
			error: 'Rate limit exceeded'
		}, {
			status: 429
		})
	}
	return NextResponse.next()
}

export const config = {
	matcher: '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
}