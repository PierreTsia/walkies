'use client'

import { useOnboardingContext } from '@/providers/OnboardingContextProvider'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useState } from 'react'
import useCompleteOnboarding from '@/hooks/mutations/useCompleteOnboarding'
import { useUser } from '@/providers/UserProvider'

import UploadDogAvatarDialog from '@/components/UploadDogAvatarDialog'
import useSaveDogAvatar from '@/hooks/mutations/useSaveDogAvatar'
import { Loader2 } from 'lucide-react'
import { CardDescription } from '@/components/ui/card'
import { useTranslations } from 'next-intl'

const defaultAvatars = [
  '/avatars/default1.png',
  '/avatars/default2.png',
  '/avatars/default3.png',
]

const DogAvatarPicker = () => {
  const t = useTranslations('DogRegistrationStep.DogAvatarPicker')
  const user = useUser()
  const userId = user?.auth_id

  const bucketPath = `/${userId}/avatars`

  const { dogs } = useOnboardingContext()
  const dogName = dogs?.[0]?.dog_name ?? 'your dog'
  const dogId = dogs?.[0]?.dog_id ?? null

  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(
    null,
  )
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const { mutateAsync: completeOnboarding } = useCompleteOnboarding()
  const { mutateAsync: saveDogAvatar, isPending: isSaveDogAvatarPending } =
    useSaveDogAvatar()

  const handleImageUpload = async (file: File) => {
    setIsUploading(true)
    try {
      const filePath = `${bucketPath}/${file.name}`
      setPreviewUrl(URL.createObjectURL(file)) // Generate a local preview URL
      setSelectedAvatar(filePath)
      setSelectedAvatarFile(file)
    } catch (error) {
      console.error('Image upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleReset = () => {
    setPreviewUrl(null)
    setSelectedAvatar(null)
    setSelectedAvatarFile(null)
  }

  const handleSaveDogAvatar = async () => {
    if (!selectedAvatarFile && selectedAvatar) {
      console.log('No file selected')
      console.log('selectedAvatar:', selectedAvatar)
      // TODO handle default avtar case
      return
    } else if (!selectedAvatarFile) {
      console.log('No avatar selected')
      return
    }
    await saveDogAvatar({
      file: selectedAvatarFile,
      bucketPath,
      dogId,
      dogName,
    })
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-xs text-secondary-foreground"></p>
      <div className="my-6 flex w-full flex-wrap items-center justify-center gap-4">
        {defaultAvatars.map((avatar, index) => (
          <Button
            variant="ghost"
            key={index}
            className={`h-20 w-20 rounded-full ring-2 ${
              selectedAvatar === avatar ? 'ring-primary' : 'ring-transparent'
            }`}
            onClick={() => {
              setSelectedAvatarFile(null)
              setPreviewUrl(null)
              setSelectedAvatar(avatar)
            }}
          >
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatar} alt={`Default avatar ${index + 1}`} />
            </Avatar>
          </Button>
        ))}
        {previewUrl && (
          <Button
            variant="ghost"
            className={`h-20 w-20 rounded-full ring-2 ring-primary`}
          >
            <Avatar className="h-20 w-20">
              <AvatarImage src={previewUrl} alt="Preview of uploaded image" />
            </Avatar>
          </Button>
        )}
        <UploadDogAvatarDialog
          handleImageUpload={handleImageUpload}
          onCancelClick={handleReset}
          isUploading={isUploading}
          previewUrl={previewUrl}
        />
      </div>
      <Button
        variant="default"
        className="mx-auto w-[300px] gap-x-2"
        disabled={!selectedAvatar || isSaveDogAvatarPending}
        onClick={handleSaveDogAvatar}
      >
        {isSaveDogAvatarPending && <Loader2 className="animate-spin" />}
        {t('save-button')}
      </Button>
      <Button
        variant="secondary"
        className="mx-auto w-[300px]"
        onClick={() => completeOnboarding()}
        disabled={!!selectedAvatar || isSaveDogAvatarPending}
      >
        {t('skip-button')}
      </Button>
    </div>
  )
}

export default DogAvatarPicker
