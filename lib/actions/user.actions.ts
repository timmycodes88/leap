'use server'

import { auth } from '@clerk/nextjs'
import User from '../models/user.model'
import { connectToDB } from '../mongoose'
import { revalidatePath } from 'next/cache'
import Team from '../models/team.model'

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
    const mongoUser = await User.findOneAndUpdate(
      { id: user.userId },
      {
        $set: { buttonType: 'good' },
        $push: { checkins: true },
        $inc: { streak: 1 },
      },
      { upsert: true }
    )

    const team = await Team.findOne({ teamId: mongoUser.teamId }).populate({
      path: 'members',
      model: User,
    })

    const giveTeamPoint = team.members.every(
      (member: any) => member.buttonType === 'good'
    )

    if (giveTeamPoint) {
      await Team.findOneAndUpdate(
        { teamId: mongoUser.teamId },
        { $push: { weeklyPoints: 1 }, $inc: { streak: 1 } },
        { upsert: true }
      )
    }

    revalidatePath('/')
    revalidatePath('/profile')
    revalidatePath('/team')
    return true
  } catch (err: any) {
    console.log(err)
    return false
  }
}
