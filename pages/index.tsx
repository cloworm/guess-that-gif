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
        <header>
          <h1>
            Guess That Gif<em>!</em>
          </h1>
        </header>

        <br />

        <Button label="PLAY" />
        <Button label="LEADERBOARD" />
        <Button label="ABOUT" />
      </main>

    </div>
  )
}
