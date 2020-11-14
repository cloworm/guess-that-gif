import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Application({ Component, pageProps, router: { pathname } }: AppProps) {
  return (
    <div>
      <Navbar hasBackButton={pathname !== "/" && pathname !== ""} />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default Application
