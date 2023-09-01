import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from '@/components/shared/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LEAP',
  description: 'An app to reinforce good habits.',
  manifest: '/manifest.json',
  themeColor: '#1f2937',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LEAP',
  },
  viewport:
    'width=device-width, height=device-height, initial-scale:1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <Provider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
