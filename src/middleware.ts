import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/utils/supabase'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request)

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const origin = `${request.nextUrl.protocol}//${request.nextUrl.host}`

  // Route-based middleware logic
  const pathname = request.nextUrl.pathname

  if (pathname === '/login') {
    if (session?.user) {
      return NextResponse.redirect(`${origin}/`)
    }
    return response
  }

  if (pathname === '/') {
    if (!session?.user) {
      return NextResponse.redirect(`${origin}/onboarding`)
    }
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', session.user.id)
      .single()

    // Redirect to /onboarding if the onboarding process is not completed
    if (!user?.onboarding_completed) {
      return NextResponse.redirect(`${origin}/onboarding`)
    }

    return response
  }

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

  // Onboarding check for onboarding route `/onboarding`
  if (pathname.startsWith('/onboarding')) {
    if (!session?.user) {
      return response
    }
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', session.user.id)
      .single()

    if (user?.onboarding_completed) {
      return NextResponse.redirect(`${origin}/`)
    }

    return response
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
    '/',
    '/login',
    '/admin/:path*', // Matches all routes under /admin/
    '/onboarding/:path*', // Matches all routes under /onboarding/
  ],
}
