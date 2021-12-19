import { NextPage } from 'next';
import Head from 'next/head'
import Sidebar from './sidebar/Sidebar'

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
                <Sidebar />
                <main className='main'>{children}</main>
            </div>
        </>
        
    )
}

export default Layout