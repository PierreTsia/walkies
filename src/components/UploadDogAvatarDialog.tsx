import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

type UploadDogAvatarDialogProps = {
  handleImageUpload: (f: File) => void
  onCancelClick: () => void
  isUploading: boolean
  previewUrl: string | null
}

const UploadDogAvatarDialog = ({
  handleImageUpload,
  onCancelClick,
  isUploading,
  previewUrl,
}: UploadDogAvatarDialogProps) => {
  const t = useTranslations('DogRegistrationStep.dialog')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-20 w-20 rounded-full"
          onClick={() => setIsOpen(true)}
        >
          <Upload />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <Input
          type="file"
          accept=".jpeg, .png, .jpg"
          placeholder="Upload an image"
          onChange={(e) =>
            e.target.files && handleImageUpload(e.target.files[0])
          }
          disabled={isUploading}
        />
        {previewUrl && (
          <div className="mt-4 flex justify-center">
            <Avatar className="h-40 w-40">
              <AvatarImage src={previewUrl} alt="Preview of uploaded image" />
            </Avatar>
          </div>
        )}
        {isUploading && <p>{t('uploading')}</p>}
        <DialogFooter className="gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              onCancelClick()
              setIsOpen(false) // Close dialog on cancel
            }}
          >
            {t('cancel')}
          </Button>
          <Button variant="default" onClick={() => setIsOpen(false)}>
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UploadDogAvatarDialog
