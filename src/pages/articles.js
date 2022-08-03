import { useState, useMemo } from 'react'
import { Layout } from '../component/Layout'
import { Card } from '../component/card'
import { useFetch } from '../custom-hook/useFetch'
import Image from 'next/image'

export default function Articles() {

    const { loading, errorMsg, data } = useFetch(`${process.env.NEXT_PUBLIC_API}/api/v1/article`)

    const [keyWord, setkey] = useState("")
    const prev = () => {}
    const next = () => {}

    const articles = useMemo(()=> {
        return data?.slice(1, 3)?.filter(item => item.title.toLowerCase().includes(keyWord))
    },[data, keyWord])

    return(
        <Layout page="articles">
           {
            articles?.length === 0 ? 
            <div className='flex items-center'>
                <Image src="/nft.png" alt="nft-monkey" width="250" height="250"  />
                <p className='text-black dark:text-white font-light'>Sorry, Artikel terbaru akan segera di rilis 😀.</p>
            </div> :
            <>
                <input 
                    value={keyWord}
                    onChange={e => setkey(e.target.value)}
                    type="search" 
                    className='border-2 my-5 outline-none py-3 px-3 border-none font-light bg-gray-200 rounded-full' 
                    placeholder='search ?'
                />
                <section className='flex mt-3 mb-10 flex-col gap-5'>
                    {
                        !loading &&
                        articles.map((data, i) => (
                            <Card key={i} {...data} />
                        ))
                    }
                </section>
                <div className='flex gap-2 md:gap-3 items-center' aria-label='pagination'>
                    <button onClick={()=> prev()} className='rounded-md shadow-md p-1 md:p-2 text-xs bg-gray-300'>prev</button>
                    <span className='text-xs font-semibold text-black dark:text-white px-2'>1 of 1</span>
                    <button onClick={()=> next()} className='rounded-md shadow-md p-1 md:p-2 text-xs bg-gray-300'>Next</button>
                </div>
            </>
           }
        </Layout>
    )
}