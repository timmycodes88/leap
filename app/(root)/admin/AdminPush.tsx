'use client'

import { useState } from 'react'
import { sendGlobalMessage } from '@/lib/actions/admin.actions'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function AdminPush() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!title) return alert('Title is required')
    if (!body) return alert('Body is required')
    setLoading(true)
    try {
      const { error } = await sendGlobalMessage(title, body)
      if (!error) toast.success('Message sent')
      else toast.error(error)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
      setTitle('')
      setBody('')
    }
  }

  return (
    <div className='mt-4'>
      <h1 className='text-2xl font-bold mb-2'>Push Notification</h1>
      <div className='flex flex-col gap-2'>
        <Input
          placeholder='Title'
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
        />
        <Input
          placeholder='Body'
          value={body}
          onChange={(e: any) => setBody(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <Loader2 className='w-4 h-5 mx-auto animate-spin' />
          ) : (
            'Push'
          )}
        </Button>
      </div>
    </div>
  )
}
