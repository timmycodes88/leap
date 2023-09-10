'use client'

import { updateButton } from '@/lib/actions/leap.actions'
import { usePathname, useRouter } from 'next/navigation'
import { use, useEffect, useRef } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Provider() {
  const pathname = usePathname()
  const router = useRouter()

  //Update Buttons for All Users
  useEffect(() => {
    const i = setInterval(() => {
      const userNow = new Date()
      const day = userNow.getDay()
      const nowHours = userNow.getHours()
      const nowMinutes = userNow.getMinutes()
      updateButton(day, nowHours, nowMinutes)
    }, 1000 * 15)
    const userNow = new Date()
    const day = userNow.getDay()
    const nowHours = userNow.getHours()
    const nowMinutes = userNow.getMinutes()
    updateButton(day, nowHours, nowMinutes)
    return () => clearInterval(i)
  }, [])

  //Swipe Navigation

  useEffect(() => {
    let touchStartX = 0
    let touchEndX = 0
    let touchStartY = 0
    let touchEndY = 0
    const touchStart = (e: any) => {
      touchStartX = e.changedTouches[0].screenX
      touchStartY = e.changedTouches[0].screenY
    }
    const touchEnd = (e: any) => {
      touchEndX = e.changedTouches[0].screenX
      touchEndY = e.changedTouches[0].screenY

      if (
        Math.abs(touchEndX - touchStartX) < 100 ||
        Math.abs(touchEndY - touchStartY) > 50
      )
        return

      //Swipe Left
      if (touchEndX < touchStartX) {
        switch (pathname) {
          case '/':
            return router.push('/team')
          case '/team':
            return router.push('/profile')
          case '/profile':
          default:
            return
        }
      }

      //Swipe Right
      if (touchEndX > touchStartX) {
        switch (pathname) {
          case '/profile':
            return router.push('/team')
          case '/team':
            return router.push('/')
          case '/':
          default:
            return
        }
      }
    }

    document.addEventListener('touchstart', touchStart)
    document.addEventListener('touchend', touchEnd)

    return () => {
      document.removeEventListener('touchstart', touchStart)
      document.removeEventListener('touchend', touchEnd)
    }
  }, [pathname, router])

  return <Toaster />
}
