import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '../../axios-instance'
import { RegistrationRequestStatus } from '@/types'
import { toast } from '@/hooks/use-toast'

type UpdateStatusParams = {
  id: string
  status: RegistrationRequestStatus
  authId: string
}

const useUpdateStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, status, authId }: UpdateStatusParams) => {
      await axiosInstance.put(`/api/registration-requests`, {
        id,
        status,
        authId,
      })
    },
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

export default useUpdateStatus
