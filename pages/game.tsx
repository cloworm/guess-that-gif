import useFetch, { CachePolicies } from 'use-http'
import {
  useCallback,
  useState,
  useEffect,
} from 'react'
import Router from 'next/router'
import Score from '../components/Score'
import Lives from '../components/Lives'
import styles from './game.module.css'
import Gif from '../components/Gif'
import GameButton from '../components/GameButton'
import {
  CreateGameResponse,
  SubmitGuessResponse,
  Game as GameType,
} from '../types'

export default function Game() {
  const [game, setGame] = useState<GameType | null>(null)
  const [submitting, setSubmitting] = useState<boolean>(false)

  const { error, data } = useFetch<CreateGameResponse>('/.netlify/functions/create-game', { method: 'post', cachePolicy: CachePolicies.NO_CACHE }, [])
  useEffect(() => {
    if (data?.game) setGame(data.game)
  }, [data])

  const submitGuess = useCallback(
    async (word: string) => {
      if (submitting) return
      setSubmitting(true)
      let response: SubmitGuessResponse|void
      try {
        response = await (await fetch(`/.netlify/functions/submit-guess?id=${game?.id}&guess=${word}`, {
          method: 'POST',
        })).json()
      } finally {
        setSubmitting(false)
      }

      if (!response || !('game' in response)) throw new Error('NO_GAME')
      // TO DO - end game when no more lives
      if (response.game.lives <= 0) {
        alert(`Your Score Was ${response.game.score}. Nice`)
        Router.push('/')
      }
      // TO DO - back end dont allow submitting rounds for dead games
      setGame(response.game)
    },
    [game, submitting]
  )

  if (!game) return null
  if (error) return `Oopsies ${error.message}`

  return (
    <div key={`${game.id}-${game.score}-${game.lives}`} className="container">
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
                submitGuess(word)
              }}
            />
          ))
        }
      </main>
    </div>
  )
}
