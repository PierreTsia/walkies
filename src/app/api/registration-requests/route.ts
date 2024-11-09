import { NextResponse } from 'next/server'
import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'
import { DateTime } from 'luxon'
import { RegistrationRequestStatus } from '@/types'

export async function GET() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase
    .from('registration_requests')
    .select('*')

  if (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch registration requests' }),
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      },
    )
  }

  return new NextResponse(JSON.stringify(data), {
    headers: {
      'Access-Control-Allow-Origin': process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function PUT(request: Request) {
  const { status, id }: { status: RegistrationRequestStatus; id: string } =
    await request.json()

  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const authUser = session?.user
  if (!authUser) {
    return NextResponse.json(
      { error: 'Failed to authenticate user' },
      { status: 401 },
    )
  }
  if (!authUser) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to authenticate user' }),
      {
        status: 401,
        headers: {
          'Access-Control-Allow-Origin': process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      },
    )
  }

  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('auth_id', authUser.id)
    .single()

  if (!user) {
    return new NextResponse(JSON.stringify({ error: 'Failed to find user' }), {
      status: 401,
      headers: {
        'Access-Control-Allow-Origin': process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
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
        headers: {
          'Access-Control-Allow-Origin': process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      },
    )
  }

  return new NextResponse(
    JSON.stringify({ message: 'Registration request updated' }),
    {
      headers: {
        'Access-Control-Allow-Origin': process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    },
  )
}
