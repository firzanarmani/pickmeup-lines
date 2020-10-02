import mongoose from 'mongoose'

const mongoUrl = 'mongodb://localhost/db_pickmeup_lines_dev'

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
