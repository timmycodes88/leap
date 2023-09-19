import { getUser } from '@/lib/actions/user.actions'
import SetQuote from './SetQuote'
import User from '@/lib/models/user.model'
import AdminPush from './AdminPush'

export default async function page() {
  const user: User = await getUser()

  return (
    <div className='flex flex-col gap-2'>
      <SetQuote name={user.name} />
      <AdminPush />
    </div>
  )
}
