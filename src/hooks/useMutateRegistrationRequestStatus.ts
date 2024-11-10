import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RegistrationRequestStatus } from '@/types'
import { toast } from '@/hooks/use-toast'
import { createBrowserClient } from '@/utils/supabase'
import { DateTime } from 'luxon'
import { useUser } from '@/providers/UserProvider'

type MutateRequestStatusParams = {
  id: string
  status: RegistrationRequestStatus
}

const useMutateRequestStatus = () => {
  const queryClient = useQueryClient()
  const supabase = createBrowserClient()
  const user = useUser()

  const updateRequestStatus = async (
    id: string,
    status: RegistrationRequestStatus,
  ) => {
    await supabase
      .from('registration_requests')
      .update({
        status,
        reviewed_at: DateTime.now().toISO(),
        reviewed_by: user?.id,
      })
      .eq('id', id)
  }

  return useMutation({
    mutationFn: async ({ id, status }: MutateRequestStatusParams) =>
      updateRequestStatus(id, status),
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
