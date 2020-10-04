import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const mongoHost =
    process.env.NODE_ENV == 'production'
        ? `mongodb+srv://${process.env.DB_USER}:` +
          `${process.env.DB_PASS}@${process.env.DB_HOST}`
        : `mongodb://localhost/`

const mongoUrl =
    mongoHost +
    `${process.env.DB_NAME}_${process.env.NODE_ENV}?retryWrites=true&w=majority`

export const connectToDatabase = (): void => {
    mongoose
        .connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        .then(() => {
            return console.log(`Successfully connected to ${mongoUrl}`)
        })
        .catch((error) => {
            return console.log('Error connecting to database: ', error)
        })
}
