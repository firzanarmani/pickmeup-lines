interface IQuote {
  _id?: string;
  quote: string;
  author?: string;
  details?: string;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface QuoteProps {
  quote: IQuote
}

type ApiDataType = {
  status: string
  message: string
  data: IQuote | IQuote[]
};

interface IState {
  isLoading: boolean
  currentQuote: IQuote
  allQuotes: IQuote[]
}

interface IAction {
  type: string
  payload: any
}

interface IContext {
  state: IState
  dispatch: React.Dispatch<IAction>
}