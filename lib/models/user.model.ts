import mongoose from 'mongoose'

interface User {
  _id: string
  id: string
  name: string
  username: string
  teamId?: string
  wakeUpTime?: string
  buttonType: 'waiting' | 'good' | 'bad' | 'disabled-waiting' | undefined
  checkins?: boolean[]
  streak: number
  isAdmin: boolean
  intentions: string[]
  pushSubscription?: object
  activePushups: boolean
  sleepMode: boolean
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
  wakeUpTime: {
    type: String,
  },
  buttonType: {
    type: String,
  },
  checkins: {
    type: [Boolean],
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  intentions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Intention',
    },
  ],
  streak: {
    type: Number,
    default: 0,
  },
  pushSubscription: {
    type: Object,
  },
  activePushups: {
    type: Boolean,
    default: false,
  },
  sleepMode: {
    type: Boolean,
    default: false,
  },
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
