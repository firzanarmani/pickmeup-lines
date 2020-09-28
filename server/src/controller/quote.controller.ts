import {
    create,
    findAll,
    findById,
    findRandom,
    remove,
    update,
} from './../services/quote.service'
import { failureResponse, successResponse } from '../common/responses.common'
import { Request, Response } from 'express'

export const showAllQuotes = (_req: Request, res: Response): void => {
    findAll()
        .then((allQuotes) => {
            successResponse('All quotes retrieved successfully', allQuotes, res)
        })
        .catch((error) => {
            failureResponse('Cannot retrieve all quotes', error, res)
        })
}

export const showQuote = (req: Request, res: Response): void => {
    findById(req.params.id)
        .then((quote) => {
            successResponse('Quote retrieved successfully', quote, res)
        })
        .catch((error) => {
            failureResponse('Cannot retrieve quote', error, res)
        })
}

export const showRandomQuote = (_req: Request, res: Response): void => {
    findRandom()
        .then((quote) => {
            successResponse('Random quote retrieved successfully', quote, res)
        })
        .catch((error) => {
            failureResponse('Cannot retrieve random quote', error, res)
        })
}

export const addQuote = (req: Request, res: Response): void => {
    create(req.body)
        .then((quote) => {
            successResponse('Quote added successfully', quote, res)
        })
        .catch((error) => {
            failureResponse('Cannot add quote', error, res)
        })
}

export const updateQuote = (req: Request, res: Response): void => {
    update(req.params.id, req.body)
        .then((quote) => {
            successResponse('Quote updated successfully', quote, res)
        })
        .catch((error) => {
            failureResponse('Cannot update quote', error, res)
        })
}

export const deleteQuote = (req: Request, res: Response): void => {
    remove(req.params.id)
        .then((quote) => {
            successResponse('Quote deleted successfully', quote, res)
        })
        .catch((error) => {
            failureResponse('Cannot delete quote', error, res)
        })
}
