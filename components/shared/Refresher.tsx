'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Refresher() {
  const router = useRouter()

  useEffect(() => {
    const i = setInterval(() => {
      router.refresh()
    }, 1000 * 5)
    return () => clearInterval(i)
  }, [router])

  return null
}
