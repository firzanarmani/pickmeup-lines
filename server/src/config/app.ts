import { connectToDatabase } from './mongodb'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routeQuotes from '../routes/quote.routes'

const app: express.Application = express()

// Setup app configurations (middleware)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Set routes for quotes API
routeQuotes(app)

// Connect to MongoDB
connectToDatabase()

export default app
