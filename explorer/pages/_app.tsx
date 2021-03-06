import '../styles/styles.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'

function Botcode({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default Botcode