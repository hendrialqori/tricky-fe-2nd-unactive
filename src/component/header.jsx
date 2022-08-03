import Link from 'next/link'
import Image from 'next/image'

export const Header = () => {

    const dark = () => {
        document.documentElement.classList.toggle("dark")
    }

    return(
        <header className="my-10 w-full">
           <div className='flex gap-3 items-center'>
                <h1 className="font-bold text-[1.5rem] text-black dark:text-white">tricky.</h1> |
                <Image onClick={()=> dark()} className="cursor-pointer" src="/Lightmode.svg" alt="icon" height="32" width="32" />
           </div>
            <nav className='flex gap-x-3 mt-10 cursor-pointer font-light'>
               <span className="opacity-70 text-black dark:text-white hover:-translate-y-1">
                    <Link href="/">
                            Terbaru
                    </Link>
               </span>
                
                <span className='opacity-70 text-black dark:text-white hover:-translate-y-1'>
                    <Link href="/articles">
                            Semua artikel
                    </Link>
               </span>
            </nav>
        </header>
    )
}