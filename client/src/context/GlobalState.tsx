import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
const initialState = {
    isLoading: false,
    currentQuote: {
        quote: ""
    },
    allQuotes: []
}

const GlobalContext = createContext<IContext>({} as IContext)
const GlobalProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    return (
        <GlobalContext.Provider 
            value={{ state, dispatch }} 
            children={children} 
        />
    )
}
export { GlobalContext, GlobalProvider }