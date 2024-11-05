import { useTranslations } from 'next-intl'

export default function Header() {
  const t = useTranslations('Header')

  return (
    <div className="flex flex-col items-center gap-16">
      <div className="flex items-center justify-center gap-8"></div>
      <h1 className="sr-only">{t('title')}</h1>
      <span className="mx-auto flex max-w-xl flex-col text-center ">
        <h1 className="text-3xl !leading-tight lg:text-4xl">{t('title')}</h1>
        <p className="font-thin">{t('description')}</p>
      </span>
      <div className="my-8 w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent p-[1px]" />
    </div>
  )
}
