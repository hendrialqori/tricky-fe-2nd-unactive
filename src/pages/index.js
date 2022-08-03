import { Layout } from "../component/Layout"
import { Thumbnail } from '../component/thumbnail'
import { useFetch } from '../custom-hook/useFetch'

export default function Home() {

  const { loading, errorMsg, data } = useFetch(`${process.env.NEXT_PUBLIC_API}/api/v1/article`)

  return(
    <Layout page="home">
        {
          !loading && <Thumbnail {...data[0]} /> 
        }
    </Layout>
  )
}