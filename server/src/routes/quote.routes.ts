import express from 'express'
import {
    addQuote,
    showAllQuotes,
    showQuote,
    updateQuote,
    deleteQuote,
    showRandomQuote,
} from '../controller/quote.controller'

const routeQuotes = (app: express.Application): void => {
    // GET all quotes and POST new quote
    app.route('/api/v1/quotes').get(showAllQuotes).post(addQuote)

    // GET random quote
    app.route('/api/v1/quotes/random').get(showRandomQuote)

    // GET single quote, PUT updated single quote and DELETE single quote
    app.route('/api/v1/quotes/:id')
        .get(showQuote)
        .put(updateQuote)
        .delete(deleteQuote)
}

export default routeQuotes
