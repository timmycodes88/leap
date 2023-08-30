import { UserButton } from '@clerk/nextjs'

export default function page() {
  return (
    <div>
      Signed IN! (protected)
      <UserButton />
    </div>
  )
}
