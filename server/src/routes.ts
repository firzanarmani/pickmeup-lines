import { Request, Response, Router } from 'express'

const router = Router()

router.get('/api/v1', (_, res: Response) => {
    res.status(200).json({ message: 'GET request successful' })
})

router.post('/api/v1', (req: Request, res: Response) => {
    res.status(200).json({ message: 'POST request successful' })
})

router.put('/api/v1', (req: Request, res: Response) => {
    res.status(200).json({ message: 'PUT request successful' })
})

router.delete('/api/v1', (req: Request, res: Response) => {
    res.status(200).json({ message: 'DELETE request successful' })
})

export default router
