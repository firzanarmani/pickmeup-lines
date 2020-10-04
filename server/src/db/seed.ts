import mongoose from 'mongoose'
import Quote from '../model/quote.model'
import { mongoUrl } from './../config/mongodb'

const data = [
    {
        quote:
            'All our dreams can come true, if we have the courage to pursue them.',
        author: 'Walt Disney',
        verified: true,
    },
    {
        quote:
            'The best time to plant a tree was 20 years ago. The second best time is now',
        details: 'Chinese proverb',
        verified: true,
    },
    {
        quote:
            'Don’t limit yourself. Many people limit themselves to what they think they can do. You can go as far as your mind lets you. What you believe, remember, you can achieve.',
        author: 'May Kay Ash',
        verified: true,
    },
    {
        quote:
            'The same boiling water that softens the potato hardens the egg. It’s what you’re made of. Not the circumstances.',
        verified: false,
    },
    {
        quote:
            'People who wonder if the glass is half empty or full miss the point. The glass is refillable',
        verified: false,
    },
    {
        quote: 'Hold the vision, trust the process.',

        verified: false,
    },
    {
        quote: 'Don’t be afraid to give up the good to go for the great.',
        author: 'John D. Rockefeller',
        verified: true,
    },
    {
        quote: 'Impossible is just an opinion.',
        author: 'Paulo Coelho',
        verified: true,
    },
    {
        quote:
            'When life gives you Monday, dip it in glitter and sparkle all day.',
        author: 'Ella Woodword',
        verified: true,
    },
    {
        quote: 'Hustle in silence and let your success make the noise.',
        verified: false,
    },
]

mongoose.connect(mongoUrl)
mongoose.connection.dropCollection('quotes')
Quote.collection.insertMany(data, () => {
    mongoose.disconnect()
})
