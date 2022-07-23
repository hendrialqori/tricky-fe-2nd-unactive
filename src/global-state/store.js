import { createContext , useContext, useReducer } from "react";

const Store = createContext({
    state : {},
    dispatch : () => {}
})

const initalState = {
    users : [],
    detailUser : {},
    loading : false,
    error : false
}

const reducer = (state, action) => {
    switch(action.type) {
        case "getUsers" :
            return {
                ...state, 
                users : action.payload
            }
        case "getDetailUsers" :
            return {
                ...state,
                detailUser : action.payload
            }
    } 
}


export const Wrapper = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initalState)
    return(
        <Store.Provider value={{ state, dispatch }}>
            { children }
        </Store.Provider>
    )
}

export const useStoreContext = () => useContext(Store) 

