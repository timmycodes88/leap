import { SignUp } from '@clerk/nextjs'

export default function page() {
  return (
    <div className='flex h-full items-center justify-center'>
      <SignUp />
    </div>
  )
}
