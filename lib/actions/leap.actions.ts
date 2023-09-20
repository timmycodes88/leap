'use server'

import { revalidatePath } from 'next/cache'
import User from '../models/user.model'
import { connectToDB } from '../mongoose'
import Team from '../models/team.model'
import { sendNotification } from '../sendNotification'

export async function updateButton(
  day: number,
  nowHours: number,
  nowMinutes: number
) {
  connectToDB()

  try {
    const users = await User.find()

    users.forEach(async (user: User) => {
      if (day === 6) return
      if (day === 0) {
        await User.findOneAndUpdate(
          { id: user.id },
          { $set: { checkins: [] } },
          { upsert: true }
        )
        await Team.findOneAndUpdate(
          { teamId: user.teamId },
          { $set: { weeklyPoints: [] } },
          { upsert: true }
        )
      }
      if (nowHours >= 13) {
        await User.findOneAndUpdate(
          { id: user.id },
          { $set: { buttonType: 'disabled-waiting', activePushups: false } },
          { upsert: true }
        )
        await Team.findOneAndUpdate(
          { teamId: user.teamId },
          { pushupCount: 0 },
          { upsert: true }
        )
      }

      if (
        !user.wakeUpTime ||
        user.buttonType === 'good' ||
        user.buttonType === 'bad'
      )
        return

      const time = user.wakeUpTime.split(':')
      const hours = parseInt(time[0])
      const minutes = parseInt(time[1])

      if (
        nowHours === hours - 1 ||
        (minutes < 40 && nowHours === hours && nowMinutes <= minutes + 15) ||
        (minutes >= 40 &&
          (nowHours === hours || (nowHours === hours + 1 && nowMinutes < 10)))
      ) {
        //Activate Users Button
        await User.findOneAndUpdate(
          { id: user.id },
          { buttonType: 'waiting' },
          { upsert: true }
        )
      }

      if (user.buttonType !== 'waiting') return

      const a =
        minutes < 40 &&
        ((nowHours === hours && nowMinutes >= minutes + 15) || nowHours > hours)
      const b =
        minutes >= 40 &&
        ((nowHours === hours + 1 && nowMinutes >= 10) || nowHours > hours + 1)

      if (a || b) {
        //Deactivate Users Button
        await User.findOneAndUpdate(
          { id: user.id },
          {
            $set: { buttonType: 'bad', streak: 0 },
            $push: { checkins: false },
          },
          { upsert: true }
        )
        const team = await Team.findOneAndUpdate(
          { teamId: user.teamId },
          { $set: { streak: 0 } },
          { upsert: true }
        ).populate({
          path: 'members',
          model: User,
        })

        if (
          team.members.some(
            (member: User) =>
              member.buttonType === 'waiting' ||
              member.buttonType === 'disabled-waiting'
          )
        )
          return

        const badCount = team.members.reduce((acc: number, member: User) => {
          if (member.buttonType === 'bad') return acc + 1
          return acc
        }, 0)

        if (badCount) {
          team.pushupCount = badCount * 10
          await team.save()

          const users = await User.find({
            teamId: team.teamId,
          })
          users.forEach(async user => {
            await User.findOneAndUpdate(
              { id: user.id },
              { activePushups: true },
              { upsert: true }
            )
            if (!user.pushSubscription) return
            await sendNotification(user.pushSubscription, {
              title: `Your team earned ${badCount * 10} pushups 😬`,
              options: {
                body: 'Once completed, tap the push-up button on your profile!',
              },
            })
          })
        }
      }
    })

    revalidatePath('/')
    revalidatePath('/team')
    revalidatePath('/profile')
  } catch (err: any) {
    console.log(err)
  }
}
