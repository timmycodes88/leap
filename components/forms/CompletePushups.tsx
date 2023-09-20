'use client'

import { completePushups } from '@/lib/actions/user.actions'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function CompletePushups() {
  const [loading, setLoading] = useState(false)

  const onCompletePushups = async () => {
    setLoading(true)
    const { error } = await completePushups()
    if (error) toast.error(error)
    else toast.success('Pushups completed!')
    setTimeout(() => setLoading(false), 500)
  }

  return (
    <button
      disabled={loading}
      onClick={onCompletePushups}
      className='bg-green-500 text-gray-900 py-0.5 px-1 rounded-md'
    >
      {loading ? <Loader2 className='w-3 h-3 animate-spin' /> : 'Complete'}
    </button>
  )
}
