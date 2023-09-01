'use client'

import { checkIn } from '@/lib/actions/user.actions'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface AdaptiveButtonProps {
  type: 'good' | 'bad' | 'waiting' | 'disabled-waiting' | 'profile' | 'team'
  disabled?: boolean
}

const icons = {
  good: '/svg/check.svg',
  bad: '/svg/no-touch.svg',
  waiting: '/svg/fingerprint.svg',
  'disabled-waiting': '/svg/fingerprint.svg',
  profile: '/svg/pencil.svg',
}

export default function AdaptiveButton({
  type,
  disabled,
}: AdaptiveButtonProps) {
  const [loading, setLoading] = useState(false)
  const check = async () => {
    if (disabled || type !== 'waiting') return
    setLoading(true)
    try {
      const success = await checkIn()
      if (!success) toast.error('Error checking in.')
      else toast.success('Checked in!')
    } catch (error) {
      console.log(error)
      toast.error('Error checking in.')
    } finally {
      setLoading(false)
    }
  }

  if (type === 'team') return null
  return (
    <button
      onClick={check}
      className={cn(
        'hover:bg-green-800 fixed z-20 right-4 bottom-[6.5rem] rounded-full p-4 bg-green-500 flex items-center justify-center',
        (disabled || loading) && 'bg-gray-400 hover:bg-gray-400'
      )}
      disabled={disabled || loading}
    >
      <Image src={icons[type]} width={36} height={36} alt='Icon' />
    </button>
  )
}
