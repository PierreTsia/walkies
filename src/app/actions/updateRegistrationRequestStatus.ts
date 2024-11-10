'use server'

import { DateTime } from 'luxon'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import { RegistrationRequestStatus } from '@/types'

const updateRegistrationRequestStatus = async (
  requestId: string,
  userId: string,
  status: RegistrationRequestStatus,
) => {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  await supabase
    .from('registration_requests')
    .update({
      status,
      reviewed_at: DateTime.now().toISO(),
      reviewed_by: userId,
    })
    .eq('id', requestId)
}

export default updateRegistrationRequestStatus
