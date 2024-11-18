import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'
import { registerDog } from '@/app/actions/registerDog'

const useSaveUserDog = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: registerDog,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['/api/save-user-dog'],
      })
      void queryClient.invalidateQueries({
        queryKey: ['/api/get-user-dogs'],
      })
      toast({
        title: 'Success',
        description: 'Dog saved',
        variant: 'success',
      })
    },
    onError: (error: Error) => {
      toast({
        title: 'Oops!',
        description: error.message,
        variant: 'destructive',
      })
      console.error('Failed saving dog:', error.message)
    },
  })
}

export default useSaveUserDog
