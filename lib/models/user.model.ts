import mongoose from 'mongoose'

interface User {
  _id: string
  id: string
  name: string
  username: string
  teamId?: string
}

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  teamId: {
    type: String,
  },
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
