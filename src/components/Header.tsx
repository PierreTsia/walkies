import { useTranslations } from 'next-intl'
import RelaxingWalk from '@/components/assets/relaxing-walk'

export default function Header() {
  const t = useTranslations('Header')

  return (
    <div className="mb-10 flex flex-col items-center ">
      <RelaxingWalk className="h-60 w-80" />
      <div className="flex items-center justify-center gap-8"></div>
      <h1 className="sr-only">{t('title')}</h1>
      <span className="mx-auto flex max-w-xl flex-col text-center ">
        <h1 className="text-3xl !leading-tight text-primary lg:text-4xl">
          {t('title')}
        </h1>
        <p className="font-thin">{t('description')}</p>
      </span>
    </div>
  )
}
