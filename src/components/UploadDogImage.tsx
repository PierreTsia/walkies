'use client'

import { useOnboardingContext } from '@/providers/OnboardingContextProvider'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from '@/app/actions/completeOnboarding'
import { Button } from '@/components/ui/button'

const UploadDogImage = () => {
  const { dogName, setHasAlreadySavedDog } = useOnboardingContext()
  const router = useRouter()

  const handleCompleteOnboarding = async () => {
    const isSuccess = await completeOnboarding()
    setHasAlreadySavedDog(isSuccess)
    if (isSuccess) {
      await router.push('/')
    }
  }

  return (
    <div className="flex flex-col gap-y-3">
      <span>WIP - We now want to upload a nice pic of {dogName}</span>
      <div className="flex w-full flex-col items-center gap-y-3">
        <Button className="w-[300px]">Upload</Button>
        <Button
          variant="secondary"
          className="w-[300px]"
          onClick={handleCompleteOnboarding}
        >
          Skip and finish Onboarding
        </Button>
      </div>
    </div>
  )
}

export default UploadDogImage
