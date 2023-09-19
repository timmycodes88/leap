'use client'

import useHydrate from '@/hooks/useHydrate'
import { Bell, BellMinus } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const urlB64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default function NotificationButton() {
  const [status, setStatus] = useState(
    typeof Notification === 'undefined' ? null : Notification.permission
  )

  useEffect(() => {
    if (status === 'default')
      toast('Please Allow Notifications - Click the Bell', {
        icon: '🔔',
      })
  }, [status])

  useEffect(() => {
    ;(async () => {
      await navigator.serviceWorker.register('/leap-sw.js')
    })()
  }, [])

  const onSubscribe = async () => {
    const perm = await Notification.requestPermission()
    setStatus(perm)
    if (perm === 'granted') {
      await navigator.serviceWorker.ready
      const reg = await navigator.serviceWorker.getRegistration()
      if (!reg) return alert('No Service Worker found')

      const options = {
        applicationServerKey: urlB64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string
        ),
        userVisibleOnly: true,
      }

      const subscription = await reg.pushManager.subscribe(options)
      const res = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      })
      const { error } = await res.json()

      if (error) return toast.error(error)
      reg.showNotification('Notifications Activated', {
        body: 'Welcome to the future of LEAP - More coming...!',
      })
    }
  }

  if (useHydrate())
    return (
      <div>
        {status === 'default' ? (
          <button onClick={onSubscribe} className='w-fit'>
            🔔
          </button>
        ) : (
          status === 'denied' && '🔕'
        )}
      </div>
    )
}
