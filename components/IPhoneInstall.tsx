'use client'
import useHydrate from '@/hooks/useHydrate'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function IPhoneInstall() {
  const [state, setState] = useState(typeof Notification === 'undefined')
  if (useHydrate() && state)
    return (
      <div className='fixed inset-0 bg-white z-50'>
        <Image
          src='/iphone-tut.png'
          alt='add to home'
          width={500}
          height={500}
          className='fixed top-0'
        />
        <button
          className='absolute z-10 top-2 right-2'
          onClick={() => setState(false)}
        >
          <X className='w-5 h-5 text-black' />
        </button>
      </div>
    )
}
