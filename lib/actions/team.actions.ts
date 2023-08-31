'use server'

import { auth } from '@clerk/nextjs'
import { connectToDB } from '../mongoose'
import Team from '../models/team.model'
import User from '../models/user.model'

export async function createTeam(teamName: string) {
  connectToDB()

  const user = auth()
  if (!user.userId) return { success: false, message: 'Not logged in' }

  try {
    // Check if Team Name is taken
    const teamNameTaken = await Team.findOne({ teamName })
    if (teamNameTaken) return { success: false, message: 'Team name taken' }

    // Generate Unique Team ID
    const generateTeamId = async () => {
      while (true) {
        const id = Math.random().toString(36).substring(2, 6)
        const idExists = await Team.findOne({ teamId: id })
        if (!idExists) return id
      }
    }

    const id = await generateTeamId()

    const team = await Team.create({
      teamName,
      teamId: id,
    })

    const loggedInUser = await User.findOneAndUpdate(
      { id: user.userId },
      { teamId: id },
      { upsert: true }
    )

    team.members.push(loggedInUser._id)

    await team.save()

    return { success: true, teamId: team._id }
  } catch (err: any) {
    console.log(err)
    return { success: false, message: err.message }
  }
}

export async function joinTeam(teamId: string) {
  connectToDB()
  const user = auth()

  try {
    const team = await Team.findOne({ teamId })

    if (!team) return { success: false, message: 'Team does not exist' }
    if (team.members.length >= 4)
      return { success: false, message: 'Team is full' }

    const currUser = await User.findOneAndUpdate(
      { id: user.userId },
      { teamId },
      { upsert: true }
    )

    team.members.push(currUser._id)

    await team.save()

    return { success: true }
  } catch (err: any) {
    console.log(err)
    return { success: false, message: err.message }
  }
}

export async function getTeam(teamId: string) {
  connectToDB()

  try {
    const team = await Team.findOne({ teamId }).populate({
      path: 'members',
      model: User,
    })

    if (!team) return false

    return team
  } catch (err: any) {
    console.log(err)
    return false
  }
}
