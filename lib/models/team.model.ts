import mongoose from 'mongoose'

export interface TeamType {
  _id: string
  teamId: string
  teamName: string
  members: string[]
  weeklyPoints: number[]
  streak: number
}

const teamSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
    unique: true,
  },
  teamName: {
    type: String,
    required: true,
    unique: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  weeklyPoints: [Number],
  streak: {
    type: Number,
    default: 0,
  },
})

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema)

export default Team
