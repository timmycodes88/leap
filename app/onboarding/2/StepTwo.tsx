'use client'

import { use, useEffect, useState } from 'react'
import Input from '@/components/ui/Input'
import Toggle from '@/components/ui/Toggle'
import Button from '@/components/ui/Button'
import { set } from 'mongoose'
import { createTeam, joinTeam } from '@/lib/actions/team.actions'
import { useRouter } from 'next/navigation'

const toggles = ['Join Team', 'Create Team']

export default function Step2() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [toggle, setToggle] = useState(toggles[0])

  const [input, setInput] = useState('')

  useEffect(() => {
    setInput('')
    setErrorMessage('')
  }, [toggle])

  const onSubmit = async () => {
    setLoading(true)
    setErrorMessage('')

    if (!input)
      return setErrorMessage(
        `Please enter a team ${toggle === 'Join Team' ? 'ID' : 'name'}.`
      )

    try {
      const { success, message } =
        toggle === 'Join Team' ? await joinTeam(input) : await createTeam(input)
      if (!success) setErrorMessage(message || "Something didn't work.")
      else router.push('/')
    } catch (err: any) {
      console.log(err)
      setErrorMessage('Unexpected error, please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='bg-gray-800 p-8 gap-10 flex flex-col items-center rounded-xl'>
        <Toggle toggle={toggle} setToggle={setToggle} toggles={toggles} />
      </div>
      <div className='bg-gray-800 p-8 gap-10 flex flex-col rounded-xl'>
        <div className='flex flex-col gap-3'>
          {toggle === 'Join Team' ? (
            <>
              <label className='font-light'>Team ID:</label>
              <Input
                value={input}
                onChange={(e: any) => setInput(e.target.value)}
                placeholder='Team ID'
                type='text'
                name='id'
              />
            </>
          ) : (
            <>
              <label className='font-light'>Team Name:</label>
              <Input
                value={input}
                onChange={(e: any) => setInput(e.target.value)}
                placeholder='Team Name'
                type='text'
                name='teamName'
              />
            </>
          )}
          {errorMessage && (
            <p className='text-red-500 font-semibold text-xs'>{errorMessage}</p>
          )}
          <Button disabled={loading} onClick={onSubmit}>
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </div>
      </div>
    </div>
  )
}
