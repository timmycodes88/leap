import mongoose from 'mongoose'

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
})

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema)

export default Team
