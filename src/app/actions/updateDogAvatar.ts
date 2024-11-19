'use server'

import { createServerClient } from '@/utils/supabase'

import { cookies } from 'next/headers'

export async function updateDogAvatar(dogId: string, url: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { error } = await supabase
    .from('dogs')
    .update({ image_url: url })
    .eq('id', dogId)

  if (error) {
    console.error('Error updating dog avatar:', error)
    throw error
  }

  return true
}
