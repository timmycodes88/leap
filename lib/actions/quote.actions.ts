'use server'

import { connect } from 'http2'
import { connectToDB } from '../mongoose'
import Quote, { QuoteType } from '../models/quote.model'
import { revalidatePath } from 'next/cache'

export async function getQuote(): Promise<QuoteType | false> {
  try {
    connectToDB()

    const quote: QuoteType | null = await Quote.findOne()

    if (!quote) return false

    return quote
  } catch (err: any) {
    console.log(err)
    return false
  }
}

interface setQuoteProps {
  text: string
  name: string
  pathname: string
  add: boolean
}

export async function setQuote({ text, name, pathname, add }: setQuoteProps) {
  try {
    connectToDB()

    if (add && (!text || !name)) return { error: 'Missing required fields.' }
    if (!pathname) return { error: 'Missing pathname field.' }

    if (add) {
      const existingQuote = await Quote.findOne()
      if (existingQuote) {
        existingQuote.quote = text
        existingQuote.author = name
        await existingQuote.save()
      } else {
        await Quote.create({
          quote: text,
          author: name,
        })
      }
    } else {
      await Quote.deleteOne()
    }

    revalidatePath(pathname)
    return {}
  } catch (err: any) {
    console.log(err)
    return { error: err.message }
  }
}
