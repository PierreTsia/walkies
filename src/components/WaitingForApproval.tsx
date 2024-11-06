import { RegistrationRequest, RegistrationRequestStatus } from '@/types'
import RequestStatusFeedback from '@/components/RequestStatusFeedback'
import { DateTime } from 'luxon'
import { useUserContext } from '@/providers/UserProvider'
import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import useDateFormats from '@/hooks/useDateFormats'
import { Button } from '@/components/ui/button'
import { useStepper } from '@/components/ui/stepper'

const WithFeedBack = ({
  children,
  status,
}: {
  children: ReactNode
  status: RegistrationRequestStatus
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center py-4">
      <RequestStatusFeedback status={status} />
      <div className="my-2 flex flex-col text-sm">{children}</div>
    </div>
  )
}

const WaitingForApproval = ({ request }: { request: RegistrationRequest }) => {
  const { locale } = useUserContext()
  const t = useTranslations('Onboarding.Steps')
  const { longDateTimeFormat } = useDateFormats()
  const { nextStep } = useStepper()
  switch (request.status) {
    case 'refused':
      return (
        <WithFeedBack status={request.status}>
          <p className="my-2 text-sm">
            {/*TODO */}
            Your request for registration was refused
          </p>
        </WithFeedBack>
      )
    case 'approved':
      const reviewedAt = request?.reviewed_at
        ? longDateTimeFormat(request.reviewed_at)
        : null
      return (
        <WithFeedBack status={request.status}>
          <p className="mt-4 w-full ">
            {t.rich('approved_at', {
              status: (chunks) => (
                <strong className="font-bold text-green-500">{chunks}</strong>
              ),
              reviewedAt,
            })}
          </p>{' '}
          <p className="mt-6 w-full ">
            {t('user_registration_step_description')}
          </p>
          <div className="mt-4 flex w-full items-center justify-center">
            <Button size="lg" onClick={nextStep}>
              {t('sign_up')}
            </Button>
          </div>
        </WithFeedBack>
      )
    case 'pending':
      const requestedAt = request?.requested_at
        ? longDateTimeFormat(request.requested_at)
        : null

      return (
        <WithFeedBack status={request.status}>
          <p className="w-full">
            {t.rich('pending_status_title', {
              status: (chunks) => (
                <strong className="font-bold text-yellow-500">{chunks}</strong>
              ),
              requestedAt,
            })}
          </p>
          <div className="my-4 flex w-full flex-col items-center px-2 font-thin">
            <p className="w-full">
              {t('name')} {request.name}
            </p>
            <p className="w-full">
              {t('email')} {request.email}
            </p>
            {request?.content_text && (
              <p className="w-full">
                {t('content')}
                {request.content_text}
              </p>
            )}
          </div>
          <p className="w-full">{t('will_be_reviewed')}</p>
        </WithFeedBack>
      )
    default:
      return null
  }
}

export default WaitingForApproval
