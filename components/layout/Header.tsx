import { UserButton } from '@clerk/nextjs'

export default function Header() {
  return (
    <header className='sticky top-0 z-10 bg-gray-800 border-b border-gray-900 shadow-md p-4 flex items-center justify-between'>
      <h1 className='font-bold text-2xl'>🐸&nbsp;&nbsp;LEAP</h1>
      <UserButton afterSignOutUrl='/landing' />
    </header>
  )
}
