import { NextResponse } from 'next/server'
import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'
import { DateTime } from 'luxon'
import { RegistrationRequestStatus } from '@/types'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '*',
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS })
}

export async function GET() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase
    .from('registration_requests')
    .select('*')
    .order('requested_at', { ascending: false })

  if (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch registration requests' }),
      {
        status: 500,
        headers: CORS_HEADERS,
      },
    )
  }

  return new NextResponse(JSON.stringify(data), {
    headers: CORS_HEADERS,
  })
}

export async function PUT(request: Request) {
  const {
    status,
    id,
    authId,
  }: { status: RegistrationRequestStatus; id: string; authId: string } =
    await request.json()

  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('auth_id', authId)
    .single()

  if (!user) {
    return new NextResponse(JSON.stringify({ error: 'Failed to find user' }), {
      status: 401,
      headers: CORS_HEADERS,
    })
  }

  const { error } = await supabase
    .from('registration_requests')
    .update({
      status,
      reviewed_at: DateTime.now().toISO(),
      reviewed_by: user.id,
    })
    .eq('id', id)

  if (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to update registration request status' }),
      {
        status: 500,
        headers: CORS_HEADERS,
      },
    )
  }

  return new NextResponse(
    JSON.stringify({ message: 'Registration request updated' }),
    {
      headers: CORS_HEADERS,
    },
  )
}
