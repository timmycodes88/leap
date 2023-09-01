'use server'

import { auth } from '@clerk/nextjs'
import User from '../models/user.model'
import { connectToDB } from '../mongoose'
import { revalidatePath } from 'next/cache'

export async function createUser(
  name: string,
  username: string
): Promise<{ success: boolean; message?: string }> {
  const user = auth()

  if (!user.userId) return { success: false, message: 'Not logged in' }

  try {
    connectToDB()

    const existingUser = await User.findOne({ id: user.userId })
    if (existingUser)
      return { success: false, message: 'User already has an account' }
    const usernameTaken = await User.findOne({ username })
    if (usernameTaken) return { success: false, message: 'Username taken' }

    await User.create({
      id: user.userId,
      name,
      username,
    })

    return { success: true }
  } catch (err: any) {
    console.log(err)
    return { success: false, message: err.message }
  }
}

export async function getUser() {
  connectToDB()
  const user = auth()

  if (!user.userId) return false

  try {
    const existingUser = await User.findOne({ id: user.userId })

    if (!existingUser) return false

    return existingUser
  } catch (err: any) {
    console.log(err)
    return { success: false, message: err.message }
  }
}

export async function updateTime(time: String) {
  connectToDB()

  const user = auth()

  if (!user.userId) return false

  try {
    await User.findOneAndUpdate(
      { id: user.userId },
      { $set: { wakeUpTime: time, buttonType: 'disabled-waiting' } },
      { upsert: true }
    )

    revalidatePath('/profile')
    revalidatePath('/')
    return true
  } catch (err: any) {
    console.log(err)
    return false
  }
}

export async function checkIn() {
  connectToDB()

  const user = auth()

  if (!user.userId) return false

  try {
    await User.findOneAndUpdate(
      { id: user.userId },
      { $set: { buttonType: 'good' }, $push: { checkins: true } },
      { upsert: true }
    )

    revalidatePath('/')
    revalidatePath('/profile')
    revalidatePath('/team')
    return true
  } catch (err: any) {
    console.log(err)
    return false
  }
}
