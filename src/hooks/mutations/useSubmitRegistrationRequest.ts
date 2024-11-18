import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'

import { submitRegistrationRequest } from '@/app/actions/submitRegistrationRequest'

const useSubmitRegistrationRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: {
      name: string
      email: string
      content_text?: string
    }) => submitRegistrationRequest(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['/api/get-anonymous-registration-request'],
      })
      toast({
        title: 'Success',
        description: 'Registration request submitted',
        variant: 'success',
      })
    },
    onError: (error: Error) => {
      toast({
        title: 'Oops!',
        description: error.message,
        variant: 'destructive',
      })
      console.error('Failed to submit registration request:', error.message)
    },
  })
}

export default useSubmitRegistrationRequest
