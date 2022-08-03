import Image from "next/image"
import Link from "next/link"

export const Card = props => {
    const { id ,avatar, avatarSource, title, category, timeRead, create, slug } = props
    return(
        <article className="flex flex-col md:flex-row gap-5">
            <Image className="rounded-md object-cover" src={process.env.NEXT_PUBLIC_API+"/"+avatar} alt="avatar" height="140" width="190" />
            <Link href={"/"+slug}>
                <div className='w-full md:w-4/12 mb-0 mt-auto flex flex-col gap-y-2 cursor-pointer'>
                    <p className='text-xs text-left md:text-right text-black dark:text-white'>{create}</p>
                    <h2 className='font-light text:lg md:text-[1.2rem] leading-6 hover:underline text-black dark:text-white'>{title}</h2>
                    <p className='text-sm text-black dark:text-white font-light'><span className='font-bold text-sky-500'>{category}</span> | {timeRead}</p>
                </div>
            </Link>
        </article>
    )
}