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
        <Button label="PLAY" path="/game" />
        <Button label="LEADERBOARD" path="/leaderboard" />
        <Button label="ABOUT" path="/about" />
      </main>
    </div>
  )
}
