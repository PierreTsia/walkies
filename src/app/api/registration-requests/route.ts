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
    .order('requested_at', { ascending: false })

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch registration requests' },
      { status: 500 },
    )
  }

  return NextResponse.json(data)
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

  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('auth_id', authUser.id)
    .single()

  if (!user) {
    return NextResponse.json({ error: 'Failed to find user' }, { status: 404 })
  }

  const { error } = await supabase
    .from('registration_requests')
    .update({
      status,
      reviewed_at: DateTime.now().toISO(),
      reviewed_by: user.id,
    })
    .eq('id', id)

  console.log('error', error)

  if (error) {
    return NextResponse.json(
      { error: 'Failed to update registration request status' },
      { status: 500 },
    )
  }

  return NextResponse.json({ message: 'Registration request updated' })
}
