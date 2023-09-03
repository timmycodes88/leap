'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { createUser } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Step1() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [nameErrorMessage, setNameErrorMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async () => {
    if (!name) return setNameErrorMessage('Please enter a name.')
    if (!username) return setErrorMessage('Please enter a username.')

    if (username.length < 3)
      return setErrorMessage('Username must be at least 3 characters.')
    if (name.length > 32)
      return setNameErrorMessage('Name must be less than 32 characters.')
    if (username.length > 16)
      return setErrorMessage('Username must be less than 16 characters.')


    setLoading(true)
    setErrorMessage('')
    setNameErrorMessage('')
    try {
      const { success, message } = await createUser(name, username)
      if (!success) setErrorMessage(message || "Something didn't work.")
      else router.push('/onboarding/2')
    } catch (err) {
      console.log(err)
      setErrorMessage('Unexpected error, please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-gray-800 p-8 gap-5 flex flex-col rounded-xl'>
      <div className='flex flex-col gap-1'>
        <label className='font-light'>Name:</label>
        <Input
          disabled={loading}
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          placeholder='Name'
          type='text'
        />
        {nameErrorMessage && (
          <p className='text-red-500 font-semibold text-xs'>
            {nameErrorMessage}
          </p>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <label className='font-light'>Username:</label>
        <Input
          disabled={loading}
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
          placeholder='Username'
          type='text'
        />
        {errorMessage && (
          <p className='text-red-500 font-semibold text-xs'>{errorMessage}</p>
        )}
      </div>
      <Button onClick={onSubmit} disabled={loading}>
        {loading ? 'Loading...' : 'Next'}
      </Button>
    </div>
  )
}
