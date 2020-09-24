import express from 'express'
import cors from 'cors'

import router from './routes'

const app: express.Application = express()

const PORT = 3000

app.use(cors())
app.use(router)

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
