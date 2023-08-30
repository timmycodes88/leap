'use client'

import { NavItems } from '@/constants/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className='fixed flex justify-around bottom-0 p-2 bg-gray-800 z-10 w-full backdrop-blur'>
      {NavItems.map(({ route, icon }) => {
        const isActive = pathname === route
        return (
          <Link
            href={route}
            key={route}
            className={`${isActive && 'bg-gray-700'} p-2 rounded-xl`}
          >
            <Image src={icon} width={30} height={30} alt={icon} className='' />
          </Link>
        )
      })}
    </nav>
  )
}
