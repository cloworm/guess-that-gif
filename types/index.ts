export interface GameInput {
  lives: number
  score: number
  round: Round
}

export interface Game extends GameInput {
  id?: string
  roundHistory?: Round[]
}

export interface GameQueryResult {
  ref: { id: string },
  data: {
    score: number,
    lives: number
    round: {
      words: string[],
      giphyUrl: string
    }
  }
}

export interface Round {
  words: string[]
  giphyUrl: string
  correctWord?: string
  guessedWord?: string
  wasCorrect?: boolean
}

export interface CreateGameResponse {
  game: Game
}
