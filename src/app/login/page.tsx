import Link from 'next/link'
import signIn from '@/app/actions/signIn'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Terminal } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import LoginForm from '@/components/LoginForm'
import { useTranslations } from 'next-intl'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface LoginFormValues {
  email: string
  password: string
}

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const t = useTranslations('Login')

  return (
    <div className="mt-4 flex w-full flex-1 flex-col justify-start gap-2 px-8">
      <Button asChild size="lg" variant="ghost" className="max-w-[180px]">
        <Link href="/">
          <ChevronLeft size={16} />
          {t('back_button')}
        </Link>
      </Button>

      <div className="mx-auto my-auto w-full max-w-[400px]">
        {searchParams?.message && (
          <Alert variant="destructive" className="animate-in">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>{searchParams.message}</AlertDescription>
          </Alert>
        )}
        <Card>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('description')} 🐾</CardDescription>
          </CardHeader>

          <CardContent>
            <LoginForm signIn={signIn} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
