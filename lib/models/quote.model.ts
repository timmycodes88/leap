import mongoose from 'mongoose'

export interface QuoteType {
  quote: string
  author: string
}

const quoteSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
})

const Quote = mongoose.models.Quote || mongoose.model('Quote', quoteSchema)

export default Quote
