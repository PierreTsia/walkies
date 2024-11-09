import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const FormButtons = ({
  reset,
  isLoading,
  confirmText,
  cancelText,
}: {
  reset: () => void
  isLoading: boolean
  confirmText: string
  cancelText: string
}) => {
  return (
    <div className="mt-6 flex justify-end gap-x-2">
      <Button variant="secondary" onClick={() => reset()} disabled={isLoading}>
        {cancelText}
      </Button>
      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 animate-spin" />}
        {confirmText}
      </Button>
    </div>
  )
}

export default FormButtons
