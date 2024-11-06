import { RegistrationRequestStatus } from '@/types'
import { CardContent, Card } from '@/components/ui/card'
import { User, Building2, UserCog } from 'lucide-react'
import React from 'react'

const RequestStatusFeedback = ({
  status,
}: {
  status: RegistrationRequestStatus
}) => {
  // eslint-disable-next-line react/jsx-no-undef
  return (
    <Card className="justify center relative flex  h-[60px]  items-center bg-primary-foreground px-2">
      <UserCog size={48} color="#3f51b5" strokeWidth={1.25} />
      <span
        className={`absolute -right-2 top-11 block h-[20px] w-[20px] rounded-full ${
          status === 'pending'
            ? 'bg-yellow-500'
            : status === 'approved'
              ? 'bg-green-500'
              : 'bg-red-500'
        }`}
      />
    </Card>
  )
}

export default RequestStatusFeedback
