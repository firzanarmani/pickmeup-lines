import mongoose, { Document, Schema } from 'mongoose'
import random from 'mongoose-simple-random'

export interface IQuote extends Document {
    quote: string
    author?: string
    details?: string
    verified?: boolean
}

const QuoteSchema: Schema = new Schema({
    quote: { type: String, required: true, trim: true },
    author: { type: String, required: false, default: 'Unknown' },
    details: { type: String, required: false, default: '' },
    verified: { type: Boolean, required: false, default: false },
})

QuoteSchema.plugin(random)

const Quote = mongoose.model<IQuote>('Quote', QuoteSchema)
export default Quote
