import { NextPage } from 'next';
import Head from 'next/head'
import SideBar from './sidebar/sidebar'

interface Props {
    children: Object
}

const Layout: NextPage<Props> = ({children}) => {
    return (
        <>
            <Head>
                <title>Botcode: By Marc-Antoine Dion</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='container'>
                <SideBar />
                <main className='main'>{children}</main>
            </div>
        </>
        
    )
}

export default Layout