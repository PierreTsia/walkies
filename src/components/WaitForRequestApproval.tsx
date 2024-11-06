import { RegistrationRequest } from '@/lib/supabase-types'

const WaitForRequestApproval = ({
  request,
}: {
  request: RegistrationRequest
}) => {
  return (
    <div>
      <h1>Wait for request approval {request.email}</h1>
    </div>
  )
}

export default WaitForRequestApproval
