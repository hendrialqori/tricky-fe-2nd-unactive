import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import jwtDecode from "jwt-decode"
import NotFound from "../pages/404"
import { Loading } from "../component/loading"

export const ProtectedPage = ({ children }) => {

    const [Token, setToken] = useState(null)
    const [user, setUser] = useState("")
    const [loading, setLoding] = useState(false)

    const refreshToken = () => {
        setLoding(true)
        axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/refresh`, {
            withCredentials : true
        })
        .then(r => {
            setToken(r?.data?.refreshToken)
            setLoding(false)
        })
        .catch(e => {
            setLoding(false)
        })
    }

    const decode = useCallback(() => {
       return new Promise((resolve, rejected) => {
            if(!Token) {  
                rejected("Guest")
            }else{
                const decode = jwtDecode(Token)
                resolve(decode?.userRole)
            }
        })
    },[Token])

    useEffect(()=> {
        refreshToken();

        (()=>{
            decode()
            .then(r => {
                setUser(r)
            })
            .catch(e => e)
        })();
        
    },[decode])


    if(loading) return <Loading />
    return user === "Superuser" ? children : <NotFound />
}