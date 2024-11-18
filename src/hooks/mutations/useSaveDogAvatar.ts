import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'
import { uploadDogAvatar } from '@/app/actions/uploadDogAvatar'
import { updateDogAvatar } from '@/app/actions/updateDogAvatar'
import { useRouter } from 'next/navigation'
import useCompleteOnboarding from '@/hooks/mutations/useCompleteOnboarding'

const uploadAndSaveDogAvatar = async ({
  file,
  bucketPath,
  dogId,
  dogName,
}: {
  file: File
  bucketPath: string
  dogId: string | null
  dogName: string
}) => {
  // Convert file to base64
  //
  if (!dogId) {
    throw new Error('dogId is required')
  }

  const fileContent = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result?.toString().split(',')[1] || '')
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file) // Reads the file as a Data URL (base64 encoded)
  })

  // Call Server Action
  const { signedUrl } = await uploadDogAvatar({
    fileContent,
    dogName,
    bucketPath,
  })
  console.log('img_path:', signedUrl)

  await updateDogAvatar(dogId, signedUrl)

  // Save dog avatar (e.g., update backend state)
}

const useSaveDogAvatar = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutateAsync } = useCompleteOnboarding()

  return useMutation({
    mutationFn: ({
      file,
      bucketPath,
      dogId,
      dogName,
    }: {
      file: File
      bucketPath: string
      dogId: string | null
      dogName: string
    }) => uploadAndSaveDogAvatar({ file, bucketPath, dogId, dogName }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['/api/get-user-dogs'],
      })

      void mutateAsync()
    },
    onError: (error: Error) => {
      toast({
        title: 'Oops!',
        description: error.message,
        variant: 'destructive',
      })
      console.error('Failed to save dog avatar:', error.message)
    },
  })
}

export default useSaveDogAvatar
