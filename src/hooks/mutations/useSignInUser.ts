import { useMutation } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'

import signIn from '@/app/actions/signIn'
import { useRouter } from 'next/navigation'

const useSIgnInUser = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Login successful',
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
      console.error('Failed login user', error.message)
      router.push('/login?message=Could not authenticate user')
    },
  })
}

export default useSIgnInUser
