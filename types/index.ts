export interface Game {
  lives: number
  score: number
  id: string
  round: Round
}

export interface Round {
  words: string[]
  giphyUrl: string
}

export interface CreateGameResponse {
  game: Game
}
