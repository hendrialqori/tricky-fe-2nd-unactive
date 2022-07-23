import { useStoreContext } from "../global-state/store"
import { getUsers } from "../global-state/actions"
import { useEffect } from "react"
import Link from "next/link"

export default function Home() {

  const { state : { users } , dispatch } = useStoreContext()
  useEffect(()=> {
      (async()=> {
          try {
            await getUsers(dispatch)
          } catch (error) {
            console.log(error)
          }
      })();
  },[dispatch])


  return (
    <div>
       {
        users.map((p, i) => (
         <Link  key={i} href={"/"+p.id}>
             <div  className={{ cursor:"pointer" }}>
              <h1>
                {p.name} | {p.email}
              </h1>
          </div>
         </Link>
        ))
       }
    </div>
  )
}