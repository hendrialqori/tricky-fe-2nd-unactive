import axios from 'axios'

export const Instance = axios.create() 
axios.defaults.withCredentials=true
Instance.interceptors.request.use(async(config) => {
    const token = await (await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/refresh`)).data
    config.headers["Authorization"] = `Bearer ${token?.refreshToken}`
    return config
    
}, (error) => {
    return Promise.reject(error)
})

Instance.interceptors.response.use((response) => {
    console.log(response.data)
    return response
}, (error) => {
    return Promise.reject(error)
})