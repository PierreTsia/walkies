import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'

import logout from '@/app/actions/logout'
import { useRouter } from 'next/navigation'

const useSIgnOutUser = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Logged out successful',
        variant: 'success',
      })
      router.push('/login')
    },
    onError: (error: Error) => {
      toast({
        title: 'Oops!',
        description: error.message,
        variant: 'destructive',
      })
      console.error('Failed logout user', error.message)
    },
  })
}

export default useSIgnOutUser
