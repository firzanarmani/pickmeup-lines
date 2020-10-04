import dotenv from 'dotenv'

import app from './config/app'

dotenv.config()

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
