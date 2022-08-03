import Image from 'next/image'
import Link from 'next/link'


export const Thumbnail = props => {

    const { id ,avatar, avatarSource, title, category, timeRead, create, slug } = props
    return(
        <article className='flex flex-col gap-x-5 md:flex-row justify-between'>
            <Image className='w-full md:w-9/12 rounded-md ' src={process.env.NEXT_PUBLIC_API + "/" +avatar} alt="thumbnail" height="270" width="500"  />
            <Link href={"/"+slug}>
                <div className='w-full md:w-4/12 mb-0 mt-3 md:mt-auto flex flex-col gap-y-2 cursor-pointer'>
                    <p className='text-xs text-right text-black dark:text-white'>{create}</p>
                    <h2 className='font-bold text-[1.2rem] leading-6 hover:underline text-black dark:text-white'>{title}</h2>
                    <p className='text-sm font-light text-black dark:text-gray-400'><span className='font-bold text-sky-500'>{category}</span> | {timeRead}</p>
                    <div className='flex flex-row-reverse md:flex-row mt-5 md:mt-0 items-center gap-2 ml-0 mr-auto  md:mr-0 md:ml-auto'>
                        <div className='leading-3'>
                            <p className='text-sky-600 dark:text-gray-300 text-xs font-light'>IT Enthusiast</p>
                            <h1 className='text-black text-sm font-light dark:text-white'>Hendri alqori</h1>
                        </div>
                        <div>
                            <Image className='rounded-full object-cover' src="/me.jpg" alt='avatar' height="40" width="40" />
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    )
}