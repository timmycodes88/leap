import BottomNav from '@/components/modals/layout/BottomNav'
import Header from '@/components/modals/layout/Header'
import ModalProvider from '@/components/providers/ModalProvider'
import Refresher from '@/components/shared/Refresher'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full'>
      <ModalProvider />
      <Refresher />
      <Header />
      <main className='p-4'>{children}</main>
      <BottomNav />
    </div>
  )
}
