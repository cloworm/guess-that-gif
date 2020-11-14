import Head from 'next/head'
import Button from '../components/Button'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Guess That Gif</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Button label="PLAY" />
        <Button label="LEADERBOARD" />
        <Button label="ABOUT" />
      </main>

    </div>
  )
}
