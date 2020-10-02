process.env.NODE_ENV = 'test'

import chai from 'chai'
import chaiHttp from 'chai-http'
import 'mocha'
import mongoose from 'mongoose'
import app from '../src/config/app'
import Quote from '../src/model/quote.model'

chai.use(chaiHttp)
chai.should()

beforeEach((done) => {
    Quote.deleteMany({}, () => {
        done()
    })
})

after(() => {
    mongoose.disconnect()
})

/*
 * Test the /GET route
 */
describe('/GET quote', () => {
    it('should get all quotes', (done) => {
        chai.request(app)
            .get('/api/v1/quotes/')
            .end((_err, res) => {
                res.should.have.status(200)
                res.body.data.should.be.a('array')
                res.body.data.length.should.be.eql(0)
                done()
            })
    })
})

/*
 * Test the /POST route
 */
describe('/POST quote', () => {
    it('should not POST a quote without quote content', (done) => {
        const emptyQuote = {
            quote: '    ',
        }
        chai.request(app)
            .post('/api/v1/quotes/')
            .send(emptyQuote)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.status.should.eql('FAILURE')
                res.body.data.should.have.property('errors')
                res.body.data.errors.should.have.property('quote')
                res.body.data.errors.quote.should.have
                    .property('kind')
                    .eql('required')
                done()
            })
    })
    it('should POST a quote', (done) => {
        const quote = {
            quote: 'Do, or do not. There is no “try',
            author: 'Yoda',
            details:
                'From the movie Star Wars: "Episode V – The Empire Strikes Back"',
            verified: true,
        }
        chai.request(app)
            .post('/api/v1/quotes/')
            .send(quote)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.status.should.be.eql('SUCCESS')
                res.body.data.should.be.a('object')
                res.body.should.have
                    .property('message')
                    .eql('Quote added successfully')
                res.body.data.should.have.property('quote')
                res.body.data.quote.should.eql(
                    'Do, or do not. There is no “try'
                )
                res.body.data.should.have.property('author')
                res.body.data.author.should.eql('Yoda')
                res.body.data.should.have.property('details')
                res.body.data.details.should.eql(
                    'From the movie Star Wars: "Episode V – The Empire Strikes Back"'
                )
                res.body.data.should.have.property('verified')
                res.body.data.verified.should.eql(true)
                done()
            })
    })
})

/*
 * Test the /GET/:id route
 */

describe('/GET/:id quote', () => {
    it('should GET a quote by the given id', (done) => {
        const quote = new Quote({
            quote: 'Do, or do not. There is no “try',
            author: 'Yoda',
            details:
                'From the movie Star Wars: "Episode V – The Empire Strikes Back"',
            verified: true,
        })
        quote.save((err, quote) => {
            chai.request(app)
                .get('/api/v1/quotes/' + quote.id)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.status.should.be.eql('SUCCESS')
                    res.body.data.should.be.a('object')
                    res.body.should.have
                        .property('message')
                        .eql('Quote retrieved successfully')
                    res.body.data.should.have.property('quote')
                    res.body.data.quote.should.eql(
                        'Do, or do not. There is no “try'
                    )
                    res.body.data.should.have.property('author')
                    res.body.data.author.should.eql('Yoda')
                    res.body.data.should.have.property('details')
                    res.body.data.details.should.eql(
                        'From the movie Star Wars: "Episode V – The Empire Strikes Back"'
                    )
                    res.body.data.should.have.property('verified')
                    res.body.data.verified.should.eql(true)
                    done()
                })
        })
    })
})

/*
 * Test the /PUT/:id route
 */
describe('/PUT/:id quote', () => {
    it('should PUT (update) a quote by the given id and updated data', (done) => {
        const wrongQuote = new Quote({
            quote: 'Do, or do not. There is no “try',
            author: 'Darth Vader',
            details: '',
            verified: false,
        })
        wrongQuote.save((err, quote) => {
            chai.request(app)
                .put('/api/v1/quotes/' + quote.id)
                .send({
                    quote: 'Do, or do not. There is no “try"',
                    author: 'Yoda',
                    details:
                        'From the movie Star Wars: "Episode V – The Empire Strikes Back"',
                    verified: true,
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.status.should.be.eql('SUCCESS')
                    res.body.data.should.be.a('object')
                    res.body.should.have
                        .property('message')
                        .eql('Quote updated successfully')
                    res.body.data.should.have.property('quote')
                    res.body.data.quote.should.eql(
                        'Do, or do not. There is no “try"'
                    )
                    res.body.data.should.have.property('author')
                    res.body.data.author.should.eql('Yoda')
                    res.body.data.should.have.property('details')
                    res.body.data.details.should.eql(
                        'From the movie Star Wars: "Episode V – The Empire Strikes Back"'
                    )
                    res.body.data.should.have.property('verified')
                    res.body.data.verified.should.eql(true)
                    done()
                })
        })
    })
})

/*
 * Test the /DELETE/:id route
 */

describe('/DELETE/:id quote', () => {
    it('should DELETE a quote by the given id', (done) => {
        const quote = new Quote({
            quote: 'Do, or do not. There is no “try',
            author: 'Yoda',
            details:
                'From the movie Star Wars: "Episode V – The Empire Strikes Back"',
            verified: true,
        })
        quote.save((err, quote) => {
            chai.request(app)
                .delete('/api/v1/quotes/' + quote.id)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.status.should.be.eql('SUCCESS')
                    res.body.data.should.be.a('object')
                    res.body.should.have
                        .property('message')
                        .eql('Quote deleted successfully')
                    res.body.data.should.have.property('quote')
                    res.body.data.quote.should.eql(
                        'Do, or do not. There is no “try'
                    )
                    res.body.data.should.have.property('author')
                    res.body.data.author.should.eql('Yoda')
                    res.body.data.should.have.property('details')
                    res.body.data.details.should.eql(
                        'From the movie Star Wars: "Episode V – The Empire Strikes Back"'
                    )
                    res.body.data.should.have.property('verified')
                    res.body.data.verified.should.eql(true)
                    done()
                })
        })
    })
})
