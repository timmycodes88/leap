import { getUser } from '@/lib/actions/user.actions'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import NotificationButton from '../../shared/NotificationButton'

export default async function Header() {
  const { isAdmin } = await getUser()

  return (
    <header className='sticky top-0 z-10 bg-gray-800 border-b border-gray-900 shadow-md p-4 flex items-center justify-between'>
      <Link href='/' className='font-bold text-2xl'>
        🐸&nbsp;&nbsp;LEAP
      </Link>
      {isAdmin && <Link href='/admin'>Admin</Link>}
      <div className='flex items-center gap-4'>
        <NotificationButton />
        <UserButton afterSignOutUrl='/landing' />
      </div>
    </header>
  )
}
