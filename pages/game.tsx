import useFetch from 'use-http'

import Score from '../components/Score'
import Lives from '../components/Lives'
import styles from './game.module.css'
import Gif from '../components/Gif'
import GameButton from '../components/GameButton'
import {
  CreateGameResponse,
} from '../types'

export default function Game() {
  const { error, data } = useFetch<CreateGameResponse>('/.netlify/functions/create-game', {}, [])

  if (!data) return null
  if (error) return `Oopsies ${error.message}`

  return (
    <div className="container">
      <main>
        <div className={styles.statusContainer}>
          <Lives number={data.game.lives} />
          <Score value={data.game.score} />
        </div>
        <Gif url={data.game.round.giphyUrl} />

        {
          data.game.round.words.map((word) => (
            <GameButton
              key={word}
              label={word}
              onPress={() => {console.log(`pressed ${word}`)}}
            />
          ))
        }
      </main>
    </div>
  )
}
