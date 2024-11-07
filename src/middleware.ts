import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/utils/supabase'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request)

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const origin =
    request.headers.get('origin') ||
    request.headers.get('referer') ||
    'http://localhost:3000'

  // Route-based middleware logic
  const pathname = request.nextUrl.pathname

  // Admin-only routes
  if (pathname.startsWith('/admin')) {
    if (!session?.user) {
      // Assuming `user.role` is available in session
      return NextResponse.redirect(`${origin}/not-authorized`)
    }

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', session.user.id)
      .single()

    if (!user?.is_admin) {
      return NextResponse.redirect(`${origin}/not-authorized`)
    }

    return response
  }

  // Authenticated user-only routes
  else if (pathname.startsWith('/user')) {
    if (!session?.user) {
      return NextResponse.redirect(`${origin}/login`)
    }
  }

  // Any other route can be handled differently if needed
  // Add custom logic here for other routes

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/user/:path*', // Matches all routes under /user/
    '/admin/:path*', // Matches all routes under /admin/
  ],
}
