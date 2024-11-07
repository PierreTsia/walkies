import { useLocaleContext } from '@/providers/LocaleProvider'
import { DateTime } from 'luxon'

const useDateFormats = () => {
  const { locale } = useLocaleContext()
  const dateLocale = locale === 'en' ? 'en-US' : 'fr-FR'

  const shortDateFormat = (dateString: string) => {
    return DateTime.fromISO(dateString).toLocaleString(
      {
        month: 'short',
        day: '2-digit',
        year: '2-digit',
      },
      {
        locale: dateLocale,
      },
    )
  }

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
    shortDateFormat,
  }
}

export default useDateFormats
