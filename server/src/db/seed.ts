import mongoose from 'mongoose'

import Quote from '../model/quote.model'
import { mongoUrl } from './../config/mongodb'
import data from '../db/quotes.json'

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
mongoose.connection.dropCollection('quotes')
Quote.collection.insertMany(data, () => {
    console.log('Seed data imported into database successfully')
    mongoose.disconnect()
})
