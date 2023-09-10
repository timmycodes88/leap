'use server'

import { auth } from '@clerk/nextjs'
import { connectToDB } from '../mongoose'
import Intention from '../models/intention.model'
import User from '../models/user.model'
import { revalidatePath } from 'next/cache'

export async function getIntentions() {
  try {
    connectToDB()

    const clerkUser = auth()

    if (!clerkUser.userId) return { error: 'Not logged in' }

    const user = await User.findOne({ id: clerkUser.userId }).populate({
      path: 'intentions',
      options: { sort: { date: 'desc' } },
    })

    if (!user) return { error: 'User not found' }

    return { intentions: user.intentions }
  } catch (err: any) {
    console.log(err)
    return { error: err.message }
  }
}

export async function setIntention(intention: string) {
  try {
    connectToDB()

    const clerkUser = auth()

    if (!clerkUser.userId) return { error: 'Not logged in' }

    const newIntention = await Intention.create({
      content: intention,
    })

    if (!newIntention) return { error: 'Failed to create intention' }

    const user = await User.findOneAndUpdate(
      { id: clerkUser.userId },
      {
        $push: { intentions: newIntention._id },
      },
      { upsert: true }
    )

    if (!user) return { error: 'Failed to update user' }

    revalidatePath('/profile')
    return {}
  } catch (err: any) {
    console.log(err)
    return { error: err.message }
  }
}

export async function checkIntention(id: string, set: boolean) {
  try {
    connectToDB()

    await Intention.findByIdAndUpdate(
      id,
      {
        $set: { complete: set },
      },
      { upsert: true }
    )

    revalidatePath('/profile')
    return {}
  } catch (err: any) {
    console.log(err)
    return { error: err.message }
  }
}

export async function deleteIntention(id: string) {
  try {
    connectToDB()

    await Intention.findByIdAndDelete(id)

    revalidatePath('/profile')
    return {}
  } catch (err: any) {
    console.log(err)
    return { error: err.message }
  }
}
