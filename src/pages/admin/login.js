import { useState } from "react"
import axios from 'axios'
import { useRouter } from "next/router"


export default function Login() {

    const router = useRouter()
    const [see, setSee] = useState(false)
    const [form, setForm] = useState({
        email : "",
        password : "",
    })
    const [response, setRes] = useState({
        loading : false,
        error : null
    })

    const { email, password } = form

    const handleChange = (e) => {
        setForm(prev => {
            return {
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }

    const handleSubmit =  (e) => {
        e.preventDefault()

        setRes({
            loading : true
        })

        axios({
            method : "POST",
            url : `${process.env.NEXT_PUBLIC_API}/api/v1/login`,
            withCredentials : true,
            headers : {
                "Content-Type" : "application/json"
            },
            data : { email, password }
        })
        .then(r => {
            setForm({
                email : "",
                password : ""
            })
            setRes({
            loading : false,
            error : ""
            })
            router.push("/admin")
        })
        .catch(error => {
            setRes({
                loading : false,
                error : error.response.data.message
            })
        })
    

    }

    return(
        <div className="h-[100vh] w-[100%] flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-11/12 md:w-[425px] mx-auto">
                <h1 className="font-semibold text-lg mb-2">tricky login</h1>
                <div className="flex flex-col">
                    <label className="font-light my-2">email {response.error !== null && `| ${response.error}`}</label>
                    <input 
                        value={email}
                        name="email"
                        onChange={handleChange}
                        className="bg-gray-100 w-full py-3 px-4 outline-none rounded-full"
                        type="text" 
                        required 
                        autoFocus
                        />
                </div>
                <div className="flex flex-col">
                    <label onClick={()=> setSee(prev => !prev)} className="font-light my-2 cursor-pointer">password</label>
                    <input 
                        value={password} 
                        name="password" 
                        onChange={handleChange} 
                        className="bg-gray-100 w-full py-3 px-4 outline-none rounded-full" 
                        type={see ? "text" : "password"} 
                        required
                    />
                </div>
                <button type="submit" className="bg-sky-500 text-white px-3 py-2 rounded-full mt-2">
                    { response.loading ? "........." : "Login" }
                </button>
            </form>
        </div>
    )
}