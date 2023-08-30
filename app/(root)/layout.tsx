import BottomNav from '@/components/layout/BottomNav'
import Header from '@/components/layout/Header'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className='p-4'>{children}</main>
      <BottomNav />
    </div>
  )
}
