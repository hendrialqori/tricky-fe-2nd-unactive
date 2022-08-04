import Head from 'next/head'
import { Header } from "./header"
import {  Footer } from "./footer"
import styles from "../../styles/Layout.module.css"


export const Layout = ({ children, page }) => {

    const titles = `tricky | ${page}`
    return (
        <div className={`${styles["main-wrapper"]} flex justify-center items-center font-openSans bg-Light dark:bg-Dark`} >
            <Head>       
                <title>{titles}</title>
            </Head>
            <main className='w-11/12 lg:w-[768px] h-[100vh] mx-auto'>
                <Header />
                    { children }
                <Footer />
            </main>
        </div>
    )
}