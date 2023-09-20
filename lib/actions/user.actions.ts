"use server"

import { auth } from "@clerk/nextjs"
import User from "../models/user.model"
import { connectToDB } from "../mongoose"
import { revalidatePath } from "next/cache"
import Team from "../models/team.model"
import { sendNotification } from "../sendNotification"

export async function createUser(
  name: string,
  username: string
): Promise<{ success: boolean; message?: string }> {
  const user = auth()

  if (!user.userId) return { success: false, message: "Not logged in" }

  try {
    connectToDB()

    const existingUser = await User.findOne({ id: user.userId })
    if (existingUser)
      return { success: false, message: "User already has an account" }
    const usernameTaken = await User.findOne({ username })
    if (usernameTaken) return { success: false, message: "Username taken" }

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
      { $set: { wakeUpTime: time, buttonType: "disabled-waiting" } },
      { upsert: true }
    )

    revalidatePath("/profile")
    revalidatePath("/")
    return true
  } catch (err: any) {
    console.log(err)
    return false
  }
}

export async function completePushups() {
  connectToDB()

  const user = auth()

  if (!user.userId) return { error: "Not logged in?" }

  try {
    await User.findOneAndUpdate(
      { id: user.userId },
      { $set: { activePushups: false } },
      { upsert: true }
    )

    revalidatePath("/profile")
    return {}
  } catch (err: any) {
    console.log(err)
    return { error: err.message }
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
        $set: { buttonType: "good" },
        $push: { checkins: true },
        $inc: { streak: 1 },
      },
      { upsert: true }
    )

    const team = await Team.findOne({ teamId: mongoUser.teamId }).populate({
      path: "members",
      model: User,
    })

    const giveTeamPoint = team.members.every(
      (member: any) => member.buttonType === "good"
    )

    if (giveTeamPoint) {
      const giveTeamStreak = team.weeklyPoints.length === 4 ? 1 : 0
      await Team.findOneAndUpdate(
        { teamId: mongoUser.teamId },
        { $push: { weeklyPoints: 1 }, $inc: { streak: giveTeamStreak } },
        { upsert: true }
      )
      const users = await User.find({
        teamId: team.teamId,
        pushSubscription: { $exists: true },
      })
      users.forEach(async user => {
        if (!user.pushSubscription) return
        await sendNotification(user.pushSubscription, {
          title: `Go ${team.teamName}! 🎉`,
          options: {
            body: "Your team has earned a point for everyone checking in!",
          },
        })
      })
    }

    if (
      !team.members.some(
        (member: User) =>
          member.buttonType === "waiting" ||
          member.buttonType === "disabled-waiting"
      )
    ) {
      const badCount = team.members.reduce((acc: number, member: User) => {
        if (member.buttonType === "bad") return acc + 1
        return acc
      }, 0)

      if (badCount) {
        team.pushupCount = badCount * 10
        await team.save()

        team.members.forEach(async (user: any) => {
          await User.findOneAndUpdate(
            { id: user.id },
            { activePushups: true },
            { upsert: true }
          )
          if (user.pushSubscription) {
            await sendNotification(user.pushSubscription, {
              title: `Your team earned ${badCount * 10} pushups 😬`,
              options: {
                body: "Once completed, tap the push-up button on your profile!",
              },
            })
          }
        })
      }
    }

    revalidatePath("/")
    revalidatePath("/profile")
    revalidatePath("/team")
    return true
  } catch (err: any) {
    console.log(err)
    return false
  }
}
