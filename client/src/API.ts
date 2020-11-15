import axios, { AxiosResponse } from 'axios';

const baseUrl: string =
  'https://pfovsecfr3.execute-api.us-east-1.amazonaws.com/production/api/v1';

export const getAllQuotes = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const quotes: AxiosResponse<ApiDataType> = await axios.get(
      `${baseUrl}/quotes`,
    );
    return quotes;
  } catch (error) {
    throw new Error(error);
  }
};

export const getRandomQuote = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const randomQuote = await axios.get(`${baseUrl}/quotes/random`);
    return randomQuote;
  } catch (error) {
    throw new Error(error);
  }
};

export const getQuote = async (_id: string): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const quote = await axios.get(`${baseUrl}/quotes/${_id}`);
    return quote;
  } catch (error) {
    throw new Error(error);
  }
};

export const addQuote = async (
  formData: IQuote,
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const Quote: Omit<IQuote, '_id'> = {
      quote: formData.quote,
      author: formData.author,
      details: formData.details,
      verified: formData.verified,
    };
    const saveQuote: AxiosResponse<ApiDataType> = await axios.post(
      `${baseUrl}/quotes`,
      Quote,
    );
    return saveQuote;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateQuote = async (
  quote: IQuote,
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const QuoteUpdate: Omit<IQuote, '_id'> = {
      quote: quote.quote,
      author: quote.author,
      details: quote.details,
      verified: quote.verified,
    };
    const updatedQuote: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/quotes/${quote._id}`,
      QuoteUpdate,
    );
    return updatedQuote;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteQuote = async (
  _id: string,
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedQuote: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/quotes/${_id}`,
    );
    return deletedQuote;
  } catch (error) {
    throw new Error(error);
  }
};
