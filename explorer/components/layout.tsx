import { NextPage } from 'next';

import Head from 'next/head'
import Sidebar from './sidebar/Sidebar'
import Footer from './Footer'

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
                <main className='main'>
                    {children}
                    <Footer />  
                </main>
            </div>
        </>
        
    )
}

export default Layout