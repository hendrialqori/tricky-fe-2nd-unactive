import axios from 'axios'
import { useState } from 'react'

export const useLike = () => {

    const [load , setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const getLike = (endpoint) => {
        setLoading(true)
        axios({
            url : endpoint,
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then(r => {
            setLoading(false)
            setSuccess(true)
        })
        .catch(e =>{
            console.error(e)
            setLoading(false)
            setSuccess(false)
        })
    }

    return [load, success, getLike]
} 