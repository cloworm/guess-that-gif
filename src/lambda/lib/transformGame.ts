import { Game, GameQueryResult } from '../../../types'

export function transformGame(gameResponse: GameQueryResult): Game {
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
