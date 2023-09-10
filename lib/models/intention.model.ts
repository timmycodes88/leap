import mongoose from 'mongoose'

export interface IntentionType {
  _id: string
  content: string
  complete: boolean
  date: string
}

const intentionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Intention =
  mongoose.models.Intention || mongoose.model('Intention', intentionSchema)

export default Intention
