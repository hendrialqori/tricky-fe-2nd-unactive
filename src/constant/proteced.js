import { useEffect, useState } from "react"
import axios from "axios"
import jwtDecode from "jwt-decode"
import NotFound from "../pages/404"
import { Loading } from "../component/loading"

export const ProtectedPage = ({ children }) => {

    const [Token, setToken] = useState("")
    const [err, setError] = useState(null)
    const [loading, setLoding] = useState(false)

    const refreshToken = () => {
        setLoding(true)
        axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/refresh`, {
            withCredentials : true
        })
        .then(r => {
            setToken(r.data.refreshToken)
            setLoding(false)
        })
        .catch(e => {
            const error = e?.response.data.message
            setError(error)
            setLoding(false)
        })
    }

    useEffect(()=> {
        refreshToken();
    },[])

    const decode = Token !== "" && error === null && jwtDecode(Token)

    if(loading) return <Loading />
    return decode.userRole !== "Superuser" && error === null ? <NotFound /> : children
}