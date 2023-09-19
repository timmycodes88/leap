'use client'

import { useModal } from '@/hooks/useModal'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '../ui/dialog'
import Button from '../ui/Button'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { setIntention } from '@/lib/actions/intention.actions'

export default function SetIntentionModal() {
  const { onClose } = useModal()

  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const close = () => {
    setText('')
    onClose()
  }

  const onSubmit = async () => {
    if (!text) return toast.error('Please enter an intention')
    setLoading(true)
    const { error } = await setIntention(text)
    setLoading(false)
    if (error) return toast.error(error)
    close()
  }

  return (
    <Dialog open onOpenChange={close}>
      <DialogContent className='bg-gray-900 rounded-lg'>
        <DialogHeader>
          <DialogTitle>
            <h2>Set Intention</h2>
          </DialogTitle>
          <DialogDescription>
            <p>You can do it!</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className='flex w-full flex-col gap-8'>
            <textarea
              onFocus={e => e.target.blur()}
              className='opacity-0 max-h-0 -mb-8'
            />
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              className='w-full h-40 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none p-2 rounded-lg bg-gray-800'
            />
            <div className='flex gap-2 justify-between'>
              <Button
                disabled={loading}
                onClick={close}
                className='bg-transparent hover:underline w-20'
              >
                Cancel
              </Button>
              <Button
                disabled={loading}
                onClick={onSubmit}
                className='rounded-xl py-2 w-20 bg-gray-700 hover:bg-gray-600'
              >
                {loading ? (
                  <Loader2 className='w-4 h-4 animate-spin mx-auto' />
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
