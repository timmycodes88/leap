'use server'

import { auth } from '@clerk/nextjs'

export async function createUser(username: string) {
  const user = auth()

  if (!user.userId) return { message: 'Not logged in' }

  //TODO: Create user in database
}
