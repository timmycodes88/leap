'use server'

import { revalidatePath } from 'next/cache'
import User from '../models/user.model'
import { connectToDB } from '../mongoose'

export async function updateButton() {
  connectToDB()

  console.log('\n\n\nupdateButton\n\n\n')

  try {
    const users = await User.find()

    users.forEach(async (user: User) => {
      const day = new Date().getDay()
      const nowHours = new Date().getHours()
      const nowMinutes = new Date().getMinutes()
      if (day === 6) return
      if (day === 0) {
        await User.findOneAndUpdate(
          { id: user.id },
          { $set: { checkins: [] } },
          { upsert: true }
        )
      }
      if (nowHours >= 13) {
        await User.findOneAndUpdate(
          { id: user.id },
          { buttonType: 'disabled-waiting' },
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

      if (nowHours === hours - 1) {
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
        ((nowHours === hours && nowMinutes > minutes + 15) || nowHours > hours)
      const b =
        minutes >= 40 &&
        ((nowHours === hours + 1 && nowMinutes > 10) || nowHours > hours + 1)

      if (a || b) {
        //Deactivate Users Button
        await User.findOneAndUpdate(
          { id: user.id },
          { $set: { buttonType: 'bad' }, $push: { checkins: false } },
          { upsert: true }
        )
      }
    })

    revalidatePath('/')
    revalidatePath('/team')
    revalidatePath('/profile')
  } catch (err: any) {
    console.log(err)
  }
}
