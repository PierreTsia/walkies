import SignUpForm, { SignUpFormData } from '@/components/SignUpForm'
import { signUp } from '@/app/actions/signUp'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { toast } from '@/hooks/use-toast'
import { useStepper } from '@/components/ui/stepper'

const UserSignUpStep = () => {
  const t = useTranslations('SignUp')
  const { nextStep } = useStepper()

  const handleSignUp = async (data: SignUpFormData) => {
    const isSignedUp = await signUp(data)
    if (isSignedUp) {
      nextStep()
    } else {
      toast({
        variant: 'destructive',
        title: t('sign_up_error'),
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('card_title')}</CardTitle>
        <CardDescription>{t('card_description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm signUp={handleSignUp} />
      </CardContent>
    </Card>
  )
}

export default UserSignUpStep
