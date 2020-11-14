import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'

function Application({ Component, pageProps, router: { pathname } }: AppProps) {
  return (
    <div>
      <Navbar hasBackButton={pathname !== "/" && pathname !== ""} />
      <Component {...pageProps} />
    </div>
  )
}

export default Application
