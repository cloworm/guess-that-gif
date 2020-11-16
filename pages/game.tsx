import useFetch from 'use-http'
import {
  useCallback,
  useState,
  useEffect,
} from 'react'

import Score from '../components/Score'
import Lives from '../components/Lives'
import styles from './game.module.css'
import Gif from '../components/Gif'
import GameButton from '../components/GameButton'
import {
  CreateGameResponse,
  Game as GameType,
} from '../types'

export default function Game() {
  const [game, setGame] = useState<GameType | null>(null)

  const { error, data } = useFetch<CreateGameResponse>('/.netlify/functions/create-game', {}, [])
  useEffect(() => {
    if (data?.game) setGame(data.game)
  }, [data])

  const submitGuess = useCallback(
    async (word: string) => {
      const response = await (await fetch(`/.netlify/functions/submit-guess?id=${game?.id}&guess=${word}`, {
        method: 'GET',
      })).json()
      if (!response?.game) throw new Error('NO_GAME')
      setGame(response.game)
    },
    [game]
  )

  if (!game) return null
  if (error) return `Oopsies ${error.message}`

  return (
    <div className="container">
      <main>
        <div className={styles.statusContainer}>
          <Lives number={game.lives} />
          <Score value={game.score} />
        </div>
        <Gif url={game.round.giphyUrl} />

        {
          game.round.words.map((word) => (
            <GameButton
              key={word}
              label={word}
              onPress={() => {
                console.log(`pressed ${word}`)
                submitGuess(word)
              }}
            />
          ))
        }
      </main>
    </div>
  )
}
