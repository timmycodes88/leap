'use server'

import User from '../models/user.model'
import { connectToDB } from '../mongoose'
import { sendNotification } from '../sendNotification'

export async function sendGlobalMessage(
  title: string,
  body: string,
  options?: any
) {
  try {
    connectToDB()

    const users = await User.find()
    users.forEach(async user => {
      if (!user.pushSubscription) return
      await sendNotification(user.pushSubscription, {
        title,
        options: { body, ...options },
      })
    })

    return {}
  } catch (err: any) {
    console.error(err)
    return { error: err.message }
  }
}
