'use client'
import Button from '@/components/ui/Button'
import { setQuote } from '@/lib/actions/quote.actions'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

interface SetQuoteProps {
  name: string
}

export default function SetQuote({ name }: SetQuoteProps) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState<boolean | string>(false)
  const pathname = usePathname()
  const onClick = async (add: boolean) => {
    if (!text && add) return toast.error('Please enter a quote')
    setLoading(add ? 'Adding' : 'Removing')
    const { error } = await setQuote({ name, text, pathname, add })
    setLoading(false)
    if (error) return toast.error(error)

    toast.success('Quote set')
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-2'>Set Quote</h1>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className='w-full h-40 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none p-2 rounded-lg bg-gray-800'
      />
      <div className='flex gap-2'>
        <Button onClick={() => onClick(true)}>
          {loading === 'Adding' ? (
            <Loader2 className='h-4 w-4 mx-auto animate-spin' />
          ) : (
            'Submit'
          )}
        </Button>
        <Button onClick={() => onClick(false)}>
          {loading === 'Removing' ? (
            <Loader2 className='h-4 w-4 mx-auto animate-spin' />
          ) : (
            'Remove'
          )}
        </Button>
      </div>
    </div>
  )
}
