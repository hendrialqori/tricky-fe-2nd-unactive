import axios from "axios"

export const getServerSideProps = async(context) => {

    const req = await axios.get(`${process.env.URL_API}/users/${context.params.id}`)
    const detail = await req.data

    console.log(process.env.URL_API)

    return {
        props : {
            detail
        }
    }

}

export default function Detail({ detail }) {
    return (
        <div>
            <p>Detail user.</p>
            <h1>{detail.name} | {detail.email}</h1>
        </div>
    )
}