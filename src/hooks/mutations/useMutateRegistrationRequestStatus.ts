import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RegistrationRequestStatus } from '@/types'
import { toast } from '@/hooks/use-toast'

import { useUser } from '@/providers/UserProvider'
import updateRegistrationRequestStatus from '@/app/actions/updateRegistrationRequestStatus'

type MutateRequestStatusParams = {
  id: string
  status: RegistrationRequestStatus
}

const useMutateRequestStatus = () => {
  const queryClient = useQueryClient()
  const user = useUser()

  return useMutation({
    mutationFn: async ({ id, status }: MutateRequestStatusParams) =>
      updateRegistrationRequestStatus(id, user?.id ?? '', status),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['/api/registration-requests'],
      })
      toast({
        title: 'Success',
        description: 'Registration request status updated',
        variant: 'success',
      })
    },
    onError: (error: Error) => {
      toast({
        title: 'Oops!',
        description: error.message,
        variant: 'destructive',
      })
      console.error(
        'Failed to update registration request status:',
        error.message,
      )
    },
  })
}

export default useMutateRequestStatus
