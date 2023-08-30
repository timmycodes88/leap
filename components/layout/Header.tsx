import { UserButton } from '@clerk/nextjs'

export default function Header() {
  return (
    <header className='sticky top-0 bg-gray-800 p-4 flex items-center justify-between'>
      <h1 className='font-bold text-2xl'>🐸&nbsp;&nbsp;LEAP</h1>
      <UserButton />
    </header>
  )
}
