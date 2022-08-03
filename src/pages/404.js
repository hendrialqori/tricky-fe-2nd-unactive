import Image from 'next/image'

export default function NotFound () {
    return(
        <div className="w-[100%] h-[100vh] flex justify-center items-center bg-Dark">
           <Image src="/nft.png" alt="nft-monkey" width="200" height="200"  />
            <div className="text-xl font-light text-center text-sky-300">
                <h1 className="font-bold">404</h1>
                <p>This page not available</p>
            </div>
        </div>
    )
}