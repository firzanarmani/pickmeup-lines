import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const mongoUrl = `mongodb://localhost/db_pickmeup_lines_${process.env.NODE_ENV}`

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

export const disconnectFromDatabase = (): void => {
    mongoose.disconnect
}
