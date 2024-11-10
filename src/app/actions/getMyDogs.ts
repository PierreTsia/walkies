'use server'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'

const getDogsByOwnerId = async (id: string) => {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data: dogs, error } = await supabase
    .from('dog_with_owners')
    .select('*')
    .eq('primary_owner_id', id)

  if (error) {
    console.error('Error fetching dogs', error)
  }
  return dogs
}

export default getDogsByOwnerId
