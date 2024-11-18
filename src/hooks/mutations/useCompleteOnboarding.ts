import { useMutation } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'

import { completeUserOnboarding } from '@/app/actions/completeOnboarding'
import { useRouter } from 'next/navigation'

const useCompleteOnboarding = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: completeUserOnboarding,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Onboarding successfully completed',
        variant: 'success',
      })

      router.push('/')
    },
    onError: (error: Error) => {
      toast({
        title: 'Oops!',
        description: error.message,
        variant: 'destructive',
      })
      console.error('Failed complete onboarding', error.message)
    },
  })
}

export default useCompleteOnboarding
