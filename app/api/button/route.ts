import User from '@/lib/models/user.model'
import { connectToDB } from '@/lib/mongoose'
import { NextResponse } from 'next/server'

export async function GET() {
  connectToDB()

  try {
    const users = await User.find()

    users.forEach(async (user: User) => {
      const day = new Date().getDay()
      const nowHours = new Date().getHours()
      const nowMinutes = new Date().getMinutes()
      if (day === 6) return
      if (day === 0 && nowHours < 1) {
        await User.findOneAndUpdate(
          { id: user.id },
          { $set: { checkins: [] } },
          { upsert: true }
        )
      }
      if (nowHours < 1) {
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

      if (
        (minutes >= 40 &&
          nowHours === hours + 1 &&
          nowMinutes > 10 &&
          nowMinutes < 20) ||
        (minutes < 40 && nowHours === hours && nowMinutes > minutes + 15)
      ) {
        //Deactivate Users Button
        await User.findOneAndUpdate(
          { id: user.id },
          { $set: { buttonType: 'bad' }, $push: { checkins: false } },
          { upsert: true }
        )
      }
    })

    return NextResponse.json(null, { status: 200 })
  } catch (err: any) {
    console.log(err)
    return new NextResponse(err, { status: 500 })
  }
}
