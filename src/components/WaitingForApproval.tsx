import { RegistrationRequest, RegistrationRequestStatus } from '@/types'
import RequestStatusFeedback from '@/components/RequestStatusFeedback'
import { DateTime } from 'luxon'
import { useUserContext } from '@/providers/UserProvider'
import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

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
      return (
        <WithFeedBack status={request.status}>
          {/*TODO */}

          <p className="-w-full">Your request for registration was approved</p>
        </WithFeedBack>
      )
    case 'pending':
      const requestedAt = DateTime.fromISO(
        request.requested_at!,
      ).toLocaleString(
        {
          month: 'long',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        },
        {
          locale: locale === 'en' ? 'en-US' : 'fr-FR',
        },
      )

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
