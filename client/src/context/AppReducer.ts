const AppReducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.payload
            }
        case "GET_RANDOM_QUOTE":
            return {
                ...state,
                currentQuote: action.payload
            }
        case "GET_ALL_QUOTES":
            return {
                ...state,
                allQuotes: action.payload
            }
        case "ADD_QUOTE":
            return {
                ...state,
                allQuotes: [...state.allQuotes, action.payload]
            }
        case "UPDATE_QUOTE":
            return {
                ...state,
                allQuotes: state.allQuotes.map(
                    quote => {
                        if (quote._id === action.payload._id) {
                            return action.payload
                        } else {
                            return quote
                        }
                    }
                )
            }
        case "DELETE_QUOTE":
            return {
                ...state,
                allQuotes: state.allQuotes.filter(
                    quote => quote._id !== action.payload 
                )
            }
        default:
            return state
    }
}

export default AppReducer