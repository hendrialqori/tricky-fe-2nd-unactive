import { useReducer, useState, useEffect } from "react"
import Image from "next/image"
import { ProtectedPage } from "../../constant/proteced"
import { useRouter } from "next/router"
import axios from "axios"
import  ReactMarkdown  from "react-markdown"
import { Component } from "../../constant/markdownStyle"
import { Instance } from "../../constant/axiosInterceptor"
import { date } from "../../constant/dateNow"

const initialState = {
    id : null,
    title : "",
    category : "",
    avatar : null,
    avatarSource : "",
    create : date,
    timeRead : "",
    content : ""
}

const reducer = (state, action) => {
    switch(action.type) {
        case "change" :
            return {
                ...state,
                [action.field] : action.payload
            }
        case "image" : 
            return {
                ...state,
                avatar : action.payload
            }
        case "edit" : {
            return {
                ...state,
                id : action.payload.id,
                title : action.payload.title,
                avatarSource : action.payload.avatarSource,
                category : action.payload.category,
                content : action.payload.content,
                create : action.payload.create,
                timeRead  : action.payload.timeRead
            }
        }
        case "clear": {
            return {
                id : null,
                title : "",
                category : "",
                avatar : null,
                avatarSource : "",
                create : "",
                timeRead : "",
                content : ""
            }
        }
    }
}

export default function Login() {

    const [response, setRes] = useState({
        loading : false,
        error : null
    })

    const router = useRouter()
    const [state, dispatch] = useReducer(reducer, initialState)
    const { id, title, category, avatar ,avatarSource, create, timeRead, content } = state

    useEffect(()=> {
        if(router.query.title) {
            axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/article/${router.query.title}`)
            .then(r => {
                const data = r.data
                dispatch({ type:"edit", payload : data })
            })
            .catch(e => console.log(e))
        }
    },[router.query.title])

    const handleChange = (e) => {
        dispatch({ 
            type : "change",
            field : e.target.name,
            payload : e.target.value
         })
    }

    const handleImage = (e) => {
        dispatch({
            type : "image",
            payload : e.target.files[0]
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setRes({
            loading : true
        })

        if(router.query.title) {
            // edit
            Instance({
                method : "PUT",
                url : `${process.env.NEXT_PUBLIC_API}/api/v1/article/update/${id}`,
                headers : {
                    "Content-Type" : "multipart/form-data"
                },
                data : { title, avatar, avatarSource, category, create, timeRead, content }
            })
            .then(r => {
                setRes({
                    loading : false,
                    error : null
                })
                dispatch({
                    type : "clear"
                })
            })
            .catch(e => {
                setRes({
                    loading : false,
                    error : e.response
                })
            })
        }else{
            // create new
            Instance({
                method : "POST",
                url : `${process.env.NEXT_PUBLIC_API}/api/v1/article`,
                headers : {
                    "Content-Type" : "multipart/form-data"
                },
                data : { title, avatar, avatarSource, category, create, timeRead, content }
            })
            .then(r => {
                setRes({
                    loading : false,
                    error : null
                })
                dispatch({
                    type : "clear"
                })
            })
            .catch(e => {
                setRes({
                    loading : false,
                    error : e.response
                })
            })
        }

    }

    return(
       <ProtectedPage>
         <div className="mb-16 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-11/12 lg:w-[768px] mx-auto">
                <h1 className="text-lg font-bold my-10">tricky form article</h1>
                <div className="flex flex-col md:flex-row gap-6 w-full">
                    <div className="flex flex-col w-full md:w-6/12 ">
                        <label className="font-light my-2">Title</label>
                        <input name="title" value={title} onChange={handleChange} className="bg-gray-100 w-full py-3 px-4 outline-none rounded-full" type="text" required />
                    </div>
                    <div className="flex flex-col w-full md:w-6/12">
                        <label className="font-light my-2">category</label>
                        <input name="category" value={category} onChange={handleChange}  className="bg-gray-100 w-full py-3 px-4 outline-none rounded-full" type="text" required  />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 w-full">
                    <div className="flex flex-col w-full md:w-6/12">
                        <label className="font-light my-2">time read</label>
                        <input name="timeRead" value={timeRead} onChange={handleChange}  className="bg-gray-100 w-full py-3 px-4 outline-none rounded-full" type="text" required />
                    </div>
                    <div className="flex flex-col w-full md:w-6/12">
                        <label className="font-light my-2">gambar</label>
                        <input onChange={handleImage} className="bg-gray-100 w-full py-3 px-4 outline-none rounded-full" type="file" required />
                    </div>
                </div>
                <div className="flex gap-6 w-full mt-5">
                    <div className="flex flex-col w-full md:w-6/12">
                        <label className="font-light my-2">sumber gambar</label>
                        <input  name="avatarSource" value={avatarSource} onChange={handleChange}  className="bg-gray-100 w-full py-3 px-4 outline-none rounded-full" type="text" required />
                    </div>
                    {
                        avatar !== null &&
                        <Image className="object-cover rounded-md" src={URL.createObjectURL(avatar)} height={100} width={200} alt="rev-img" />
                    }
                </div>
                <textarea
                    name="content" value={content} onChange={handleChange} 
                    className="w-full rounded-3xl bg-gray-200 outline-none p-3 my-3 text-[18px]"
                    cols="40"
                    rows="9"
                    required
                />
                <ReactMarkdown 
                    components={Component}  
                    className="prose max-w-none prose-headings:text-white prose-blockquote:bg-gray-800
                            prose-p:text-white prose-pre:bg-main prose-strong:text-gray-200
                            w-full text-[18px] my-10 text-black dark:text-white"        
                >
                    {content}
                </ReactMarkdown>
                <button className="bg-sky-500 px-4 text-white py-3 rounded-full">
                    { response.loading ? "......" : "Submit" }
                </button>
                <p className="text-rose-700">
                    {response.error && `! ${response.error}`}
                </p>
            </form>
        </div>
       </ProtectedPage>
    )
} 