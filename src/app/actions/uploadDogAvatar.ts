'use server'

import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'

export async function uploadDogAvatar({
  fileContent,
  dogName,
  bucketPath,
}: {
  fileContent: string
  dogName: string
  bucketPath: string
}) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const TEN_YEARS_IN_SECONDS = 60 * 60 * 24 * 365 * 10
  const filePath = `${bucketPath}/${dogName}`

  const buffer = Buffer.from(fileContent, 'base64')

  const { error } = await supabase.storage
    .from('walkies') // Replace with your bucket name
    .upload(filePath, buffer, {
      upsert: true,
      contentType: 'image/png', // Adjust based on the file type
    })

  const { data: urlData, error: getStorageError } = await supabase.storage
    .from('walkies')
    .createSignedUrl(filePath, TEN_YEARS_IN_SECONDS)

  if (error || getStorageError) {
    console.error(
      'Error uploading avatar:',
      error?.message,
      getStorageError?.message,
    )
    throw error
  }

  return urlData
}
