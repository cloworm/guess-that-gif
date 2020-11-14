import Head from 'next/head'
import Footer from '../components/Footer'
import Button from '../components/Button'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Guess that Gif</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Button label="PLAY" />
        <Button label="LEADERBOARD" />
        <Button label="ABOUT" />
      </main>

      <Footer />
    </div>
  )
}
