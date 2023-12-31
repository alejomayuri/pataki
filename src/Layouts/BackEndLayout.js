import Head from "next/head"
import { MainMenu } from "@/components/BackEnd/MainMenu/MainMenu"
import { Header } from "@/components/BackEnd/Header/Header"
import { LoginForm } from "@/components/BackEnd/Login/Login"
import useAdminCheck from "@/hooks/useAdminCheck"

const BackEndLayout = ({ children }) => {
    const isAdmin = useAdminCheck();

    if (isAdmin === 'LOADING') {
        return (
            <>
                <Head>
                    <title>Back plataform</title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                <div>
                    <MainMenu />
                    <main className='BackEndMain'>
                        <h1>Loading...</h1>
                    </main>
                </div>
            </>
        )
    } else if (isAdmin === 'NOT_ADMIN') {
        return <LoginForm />
    } else {
        return (
            <>
                <Head>
                    <title>Back plataform</title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                <div>
                    <MainMenu />
                    <main className='BackEndMain'>
                        <div>
                            {children}
                        </div>
                    </main>
                </div>
            </>
        )
    }
}

export { BackEndLayout }