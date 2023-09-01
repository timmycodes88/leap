'use client'

import { updateTime } from '@/lib/actions/user.actions'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useUpdateEffect } from 'usehooks-ts'

interface SetTimeProps {
  currTime: string | undefined
}

export default function SetTime({ currTime }: SetTimeProps) {
  console.log('SetTime.tsx: SetTimeProps: currTime: ', currTime)
  const [time, setTime] = useState(currTime || '00:00')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value)
  }

  useUpdateEffect(() => {
    const t = setTimeout(async () => {
      try {
        if (new Date().getHours() < 12)
          toast.error('You can only update your time after 12:00 PM.')
        const success = await updateTime(time)
        if (!success) toast.error('Something went wrong.')
        else toast.success('Updated time.')
      } catch (err: any) {
        toast.error(err.message || 'Something went wrong.')
      }
    }, 1500)
    return () => clearTimeout(t)
  }, [time])

  return (
    <input
      className='bg-gray-700 outline-none p-2 rounded-xl [&::-webkit-calendar-picker-indicator]:invert'
      value={time}
      onChange={handleChange}
      type='time'
    />
  )
}