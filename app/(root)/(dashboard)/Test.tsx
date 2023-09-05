'use client'

import { useEffect, useState } from "react"

export default function Test() {
    const [time, setTime] = useState('')

    useEffect(() => {
        const i = setInterval(() => {
            const userNow = new Date()
            const nowHours = userNow.getHours()
            const nowMinutes = userNow.getMinutes()
            setTime(`${nowHours}:${nowMinutes < 10 ? '0' + nowMinutes : nowMinutes}`)
        }, 1000 * 15)
        const userNow = new Date()
      const nowHours = userNow.getHours()
      const nowMinutes = userNow.getMinutes()
        setTime(`${nowHours}:${nowMinutes < 10 ? '0' + nowMinutes : nowMinutes}`)
        return () => clearInterval(i)
    }, [])
  return (
    <div>{time}</div>
  )
}
