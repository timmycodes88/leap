'use client'

import Input from '@/components/ui/Input'
import { createUser } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Step1() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState('Please enter a username.')

  const onSubmit = async () => {
    if (!username) return setErrorMessage('Please enter a username.')
    if (username.length < 3)
      return setErrorMessage('Username must be at least 3 characters.')
    if (username.length > 16)
      return setErrorMessage('Username must be less than 16 characters.')
    setLoading(true)
    try {
      await createUser(username)
      router.push('/onboarding/2')
    } catch (err) {
      console.log(err)
      setErrorMessage('Unexpected error, please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-gray-800 p-8 gap-10 flex flex-col rounded-xl'>
      <div className='flex flex-col gap-3'>
        <label className='font-light'>Username:</label>
        <Input
          disabled={loading}
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
          placeholder='Username'
          type='text'
          name='username'
        />
        {errorMessage && (
          <p className='text-red-500 font-semibold text-xs'>{errorMessage}</p>
        )}
      </div>
      <button
        disabled={loading}
        className='rounded-xl py-2 w-full bg-gray-700 hover:bg-gray-600'
        type='submit'
        onClick={onSubmit}
      >
        {loading ? 'Loading...' : 'Next'}
      </button>
    </div>
  )
}
