import express, { Request, Response } from 'express'

const app: express.Application = express()

const PORT = 3000

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello World')
})

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
