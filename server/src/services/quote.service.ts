import Quote, { IQuote } from '../model/quote.model'

export const findAll = async (): Promise<IQuote[]> => {
    return await Quote.find().exec()
}

export const findById = async (id: any): Promise<IQuote> => {
    return await Quote.findById(id).exec()
}

export const findRandom = async (): Promise<IQuote> => {
    return await new Promise<IQuote>((resolve, reject) =>
        Quote.findRandom({}, {}, { limit: 1 }, (err: any, quote: IQuote[]) => {
            if (err) {
                return reject(err)
            }
            resolve(quote[0])
        })
    )
}

export const create = async (newQuote: any): Promise<IQuote> => {
    return await new Quote(newQuote).save()
}

export const update = async (id: any, updatedQuote: any): Promise<IQuote> => {
    return await Quote.findByIdAndUpdate(id, updatedQuote, { new: true }).exec()
}

export const remove = async (id: any): Promise<IQuote> => {
    return await Quote.findByIdAndDelete(id).exec()
}
