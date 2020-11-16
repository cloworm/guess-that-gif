export function transformGame(gameResponse: any) {
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
