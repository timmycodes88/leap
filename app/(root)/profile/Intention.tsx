'use client'

import { Checkbox } from '@/components/ui/checkbox'
import {
  checkIntention,
  deleteIntention,
} from '@/lib/actions/intention.actions'
import { IntentionType } from '@/lib/models/intention.model'
import { formatDateString } from '@/lib/utils'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Intention({
  _id,
  content,
  complete,
  date,
}: IntentionType) {
  const [isComplete, setIsComplete] = useState(complete)

  const onCheck = async () => {
    setIsComplete(!complete)
    const { error } = await checkIntention(JSON.parse(_id), !complete)
    if (error) {
      setIsComplete(complete)
      toast.error(error)
      return
    }
  }

  const onDelete = async () => {
    const { error } = await deleteIntention(JSON.parse(_id))
    if (error) return toast.error(error)
  }

  return (
    <div className='flex items-top justify-between'>
      <div className=' items-top flex space-x-2'>
        <Checkbox
          id='check'
          onClick={onCheck}
          checked={isComplete}
          className='mt-0.5'
        />
        <label htmlFor='check' className='text-white/90 text-xs'>
          {content}
        </label>
      </div>
      <div className='flex gap-2 flex-col min-w-fit items-end'>
        <p className='ml-2 text-gray-500 text-xs'>{formatDateString(date)}</p>
        <button onClick={onDelete}>
          <Trash className='h-3 w-3 text-red-500' />
        </button>
      </div>
    </div>
  )
}
