import Head from 'next/head'
import { Header } from "./header"
import {  Footer } from "./footer"
import styles from "../../styles/Layout.module.css"


export const Layout = ({ children, page }) => {
    return (
        <div className={`${styles["main-wrapper"]} flex justify-center items-center font-sans bg-Light dark:bg-Dark`} >
            <Head>       
                <link rel="shortcut icon" href="/logo.png" />
                <title>Tricky | { page }</title>
            </Head>
            <main className='w-11/12 lg:w-[768px] mx-auto'>
                <Header />
                    { children }
                <Footer />
            </main>
        </div>
    )
}