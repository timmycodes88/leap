import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div>
      <Link href='/sign-in'>
        <Button>Sign In</Button>
      </Link>
    </div>
  )
}
