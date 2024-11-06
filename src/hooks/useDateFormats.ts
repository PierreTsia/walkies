import { useUserContext } from '@/providers/UserProvider'
import { DateTime } from 'luxon'

const useDateFormats = () => {
  const { locale } = useUserContext()
  const dateLocale = locale === 'en' ? 'en-US' : 'fr-FR'

  const longDateTimeFormat = (dateString: string) => {
    return DateTime.fromISO(dateString).toLocaleString(
      {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      },
      {
        locale: dateLocale,
      },
    )
  }

  return {
    longDateTimeFormat,
  }
}

export default useDateFormats
