export interface GameInput {
  lives: number
  score: number
  round: Round
}

export interface Game extends GameInput {
  id?: string
  roundHistory?: Round[]
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
