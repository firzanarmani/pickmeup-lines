import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import routeQuotes from '../routes/quote.routes'

class App {
    public app: express.Application
    // TODO: dotenv
    public mongoUrl = 'mongodb://localhost/db_pickmeup_lines_local'

    constructor() {
        this.app = express()
        this.config()
        this.connectToDatabase()
    }

    private config(): void {
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        routeQuotes(this.app)
    }

    private connectToDatabase(): void {
        mongoose
            .connect(this.mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
            .then(() => {
                return console.log(`Successfully connected to ${this.mongoUrl}`)
            })
            .catch((error) => {
                return console.log('Error connecting to database: ', error)
            })
    }
}

export default App
