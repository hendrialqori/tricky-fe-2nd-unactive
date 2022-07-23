import axios from "axios";

export const getUsers = (dispatch) => {
    return new Promise((resolve, rejected) => {
        axios(`${process.env.NEXT_PUBLIC_API}/users`)
        .then((res)=> {
            dispatch({ type:"getUsers", payload : res.data })
            resolve(res.data)
        })
        .catch((error) => {
            rejected(error?.message)
        })
    })
}