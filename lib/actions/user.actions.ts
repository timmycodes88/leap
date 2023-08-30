'use server'

import { auth } from '@clerk/nextjs'
import User from '../models/user.model'
import { connectToDB } from '../mongoose'

export async function createUser(username: string): Promise<{ success: boolean, message?: string }> {
  const user = auth()

  if (!user.userId) return { success: false, message: 'Not logged in' }

  try {

    connectToDB()

    const existingUser = await User.findOne({ id: user.userId })
    if (existingUser) return { success: false, message: 'User already has an account' }
    const usernameTaken = await User.findOne({ username })
    if (usernameTaken) return { success: false, message: 'Username taken' }

    await User.create({
      id: user.userId,
      username
    })

    return { success: true }

  } catch (err: any) {
    return { success: false, message: err.message }
  }

}
