import { useState, useEffect } from 'react'
import axios from 'axios'


export const useDetail = endpoint => {
    const [datas, setDatas] = useState({
        loading : false,
        errorMsg : "",
        data : {}
    })
    const { loading, errorMsg, data } = datas

    useEffect(()=> {
        (()=> {
            setDatas({
                loading : true
            })
            axios.get(endpoint, {
                headers : {
                    "Content-Type" : "application/json"
                }
            })

            .then(res => {
                setDatas(prev => {
                    return {
                        ...prev,
                        loading : false,
                        errorMsg : "",
                        data : res.data
                    }
                })
            })

            .catch(err => {
                setDatas(prev => {
                    return {
                        ...prev,
                        loading : false,
                        errorMsg : err,
                        data : []
                    }
                })
            })
        })()
    }, [endpoint])


    return { loading, errorMsg, data }
}