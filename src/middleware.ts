import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/utils/supabase'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request)

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const origin = `${request.nextUrl.protocol}//${request.nextUrl.host}`
  console.log('origin middleware', origin)

  // Route-based middleware logic
  const pathname = request.nextUrl.pathname

  if (pathname === '/') {
    if (!session?.user) {
      return NextResponse.redirect(`${origin}/onboarding`)
    }

    const { data: onboardingStatus } = await supabase
      .from('onboarding_process_complete')
      .select('is_completed')
      .eq('auth_id', session.user.id)
      .single()

    // Redirect to /onboarding if the onboarding process is not completed
    if (!onboardingStatus?.is_completed) {
      return NextResponse.redirect(`${origin}/onboarding`)
    }
  }

  // Admin-only routes
  else if (pathname.startsWith('/admin')) {
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
  else if (pathname.startsWith('/onboarding')) {
    if (!session?.user) {
      return response
    }

    const { data: onboardingStatus } = await supabase
      .from('onboarding_process_complete')
      .select('is_completed')
      .eq('auth_id', session?.user?.id ?? '')
      .single()

    // Redirect to / if the onboarding process is completed
    if (onboardingStatus?.is_completed) {
      return NextResponse.redirect(`${origin}/`)
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
    '/admin/:path*', // Matches all routes under /admin/
    '/onboarding/:path*', // Matches all routes under /onboarding/
  ],
}
