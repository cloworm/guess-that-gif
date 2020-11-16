export interface GameInput {
  lives: number
  score: number
  round: Round
}

export interface Game extends GameInput {
  _id?: string
}

export interface Round {
  words: string[]
  giphyUrl: string
  correctWord?: string
  selectedWord?: string
  wasCorrect?: boolean
}

export interface CreateGameResponse {
  game: Game
}

export interface WordSet {
  words: string[]
  eid: number
  numReports: number
}
