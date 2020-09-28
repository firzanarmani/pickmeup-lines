import { Response } from 'express'
import { IQuote } from '../model/quote.model'

export const successResponse = (
    msg: string,
    data: IQuote | IQuote[] | null,
    res: Response
): void => {
    res.status(200).json({
        status: 'SUCCESS',
        message: msg,
        data,
    })
}

export const failureResponse = (msg: string, err: any, res: Response): void => {
    res.status(200).json({
        status: 'FAILURE',
        message: msg,
        data: err,
    })
}
