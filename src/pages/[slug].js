import { Layout } from "../component/Layout"
import Image from "next/image"
import { useRouter } from "next/router"
import { useDetail } from "../custom-hook/useDetail"
import { useLike } from "../custom-hook/useLike"
import ReactMarkdown from "react-markdown"
import { Component } from "../constant/markdownStyle"
import NotFound from "./404"

export default function Detail () {

    const router = useRouter()
    const { loading, errorMsg, data } = useDetail(`${process.env.NEXT_PUBLIC_API}/api/v1/article/${router.query.slug}`)
    const [ load, success, getLike ] = useLike()


    if(errorMsg) return <NotFound />
    return(
        <Layout page={data?.title}>
           {
            !loading && 
            <article className="text-center">
                <div className="w-full md:w-max mx-auto mb-5">
                    <Image className='rounded-md object-cover' src={process.env.NEXT_PUBLIC_API+"/"+data.avatar} alt="thumbnail" height="270" width="500"  />
                    <p className="text-xs font-light text-left opacity-60 text-black dark:text-white">sumber : {data.avatarSource}</p>
                </div>   
                <h1 className="text-xl md:text-3xl my-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 dark:from-purple-400 to-pink-600 dark:to-pink-400">{data.title}</h1>
                <div className="flex gap-2 w-max mx-auto text-xs font-light mb-5 text-black dark:text-gray-300">
                    <p className="font-bold text-purple-400">{data.category}</p> |
                    <p>{data.create}</p> |
                    <p>{data.timeRead}</p>
                </div>
                <div className="flex text-xs items-center gap-2 text-black dark:text-gray-300">
                    <Image src="/love.png" alt="icon" height={13} width={13} />
                    <p className="-translate-x-1">{data.loved}</p>
                </div>
                <ReactMarkdown 
                    components={Component}  
                    className="text-left prose max-w-none prose-blockquote:text-white dark:prose-blockquote:text-black
                            prose-pre:bg-main prose-strong:text-black dark:prose-strong:text-white
                            w-full text-[16px] my-5 text-black dark:text-white dark:font-light"        
                >
                    {data.content}
                </ReactMarkdown>

            <div className="mt-24">
                <button onClick={()=> getLike(`${process.env.NEXT_PUBLIC_API}/api/v1/article/getLoved/${data?.id}`)} className="flex gap-2 items-center font-light text-black dark:text-white">
                    <Image src="/like.ico" alt="icon" width={24} height={24} />
                    { load ? <>....</> : success ? "Terima kasih!" : "Apakah artikel ini membantu?" }
                </button>
            </div>
           </article>
           }
        </Layout>
    )
}