import { GameQueryResult } from '../../../types'

export function transformGame(gameResponse: GameQueryResult) {
  return {
    id: gameResponse.ref.id,
    score: gameResponse.data.score,
    lives: gameResponse.data.lives,
    round: {
      words: gameResponse.data.round.words,
      giphyUrl: gameResponse.data.round.giphyUrl
    }
  }
}
