import { useFetch } from "../../custom-hook/useFetch"
import { Card } from '../../component/card'
import Link from 'next/link'
import { ProtectedPage } from "../../constant/proteced"
import axios from "axios"
import { useRouter } from "next/router"
import { Instance } from '../../constant/axiosInterceptor'

export default function Admin() {

    const router = useRouter()
    const { loading, errorMsg, data } = useFetch(`${process.env.NEXT_PUBLIC_API}/api/v1/article`)
    
    const edit  = (slug) => {
        router.push("/admin/form?title="+slug)
    }
    
    const hapus = (id, title) => {

        const ask = confirm(`Yakin ingin mengapus " ${title} " ?`)
        if(!ask) return;

        Instance.delete(`${process.env.NEXT_PUBLIC_API}/api/v1/article/delete/${id}`)
        .then(r => window.location.reload())
    }
    
    const logout = () => {
        const ask = confirm("Yakin ingin keluar ?")

        if(!ask) return
        axios.delete(`${process.env.NEXT_PUBLIC_API}/api/v1/logout`, {
            withCredentials : true
        })
        .then(r => {
            router.push("/admin/login")
        })
        .catch(e => {
            return e.message
        })

    }

    return(
        <ProtectedPage>
            <section className="flex justify-between my-10">
                <div className="w-11/12 md:w-[768px] mx-auto" aria-label="admin-wrapper">
                    <Link href="/admin/form">
                        <p className="mb-10 bg-gray-300 p-1 w-max rounded-md text-sm cursor-pointer">Create new article</p>
                    </Link>
                    {
                        !loading &&
                        data.map((item, i) => (
                            <div key={i} className="mb-10">
                                <div className="text-sm font-semibold my-1">
                                    <h1>Seen : {item.seen}</h1>
                                    <h1>Loved : {item.loved}</h1>
                                </div>
                                <Card {...item} />
                                <div className="mt-2 text-sm">
                                    <button onClick={() => edit(item.slug)} className="py-1 px-2 rounded-md bg-gray-200 hover:bg-gray-400">Edit</button>{" "}
                                    <button onClick={() => hapus(item.id, item.title)} className="py-1 px-2 rounded-md bg-gray-200 hover:bg-gray-400">Hapus</button>
                                </div>
                            </div>

                        ))
                    }
                    <button onClick={()=> logout()} className="py-1 px-2 text-white rounded-md bg-rose-700 hover:bg-gray-400 mt-10">Logout</button>
                </div>
            </section>
        </ProtectedPage>
    )
}