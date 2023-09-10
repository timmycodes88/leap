import BottomNav from '@/components/layout/BottomNav'
import Header from '@/components/layout/Header'
import ModalProvider from '@/components/providers/ModalProvider'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full'>
      <ModalProvider />
      <Header />
      <main className='p-4'>{children}</main>
      <BottomNav />
    </div>
  )
}
