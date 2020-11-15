import useFetch from 'use-http'

import Score from '../components/Score'
import Lives from '../components/Lives'
import styles from './game.module.css'
import Gif from '../components/Gif'
import GameButton from '../components/GameButton'

interface Game {
  lives: number
  score: number
  id: string
}

interface Data {
  game: Game
}

export default function Game() {
  const { error, data } = useFetch<Data>('/.netlify/functions/create-game', {}, [])

  if (!data) return null
  if (error) return `Oopsies ${error.message}`

  return (
    <div className="container">
      <main>
        <div className={styles.statusContainer}>
          <Lives number={data.game.lives} />
          <Score value={data.game.score} />
        </div>
        <Gif />

        <GameButton onPress={() => {console.log('pressed Coarse')}} label="Coarse" />
        <GameButton onPress={() => {console.log('pressed Corse')}} label="Corse" />
        <GameButton onPress={() => {console.log('pressed Course')}} label="Course" />
      </main>
    </div>
  )
}
