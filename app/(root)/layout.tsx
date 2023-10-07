import BottomNav from '@/components/modals/layout/BottomNav'
import Header from '@/components/modals/layout/Header'
import ModalProvider from '@/components/providers/ModalProvider'
import Provider from '@/components/shared/Provider'
import Refresher from '@/components/shared/Refresher'
import { getUser } from '@/lib/actions/user.actions'

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  const isSleeping = !!user?.sleepMode

  return (
    <div className='h-full'>
      <Provider />
      <ModalProvider />
      {!isSleeping && <Refresher />}
      <Header />
      <main className='p-4'>{children}</main>
      <BottomNav />
    </div>
  )
}
