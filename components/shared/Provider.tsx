'use client'

import { updateButton } from '@/lib/actions/leap.actions'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Provider() {
  useEffect(() => {
    const i = setInterval(() => updateButton(), 1000 * 60)
    updateButton()
    return () => clearInterval(i)
  }, [])

  return <Toaster />
}
