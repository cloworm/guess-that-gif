import giphy from 'giphy-api'
import allWords from '../resources/words'

import {
  Round
} from '../../../types'

const Giphy = giphy(process.env.GIPHY_API_KEY)

export async function generateRound(): Promise<Round> {
  const maxTries = 50
  let round: Round | undefined

  for (let i = 0; i < maxTries; i++) {
    const correctWord = selectRandomWord()

    const giphyRes = await Giphy.random({
      tag: correctWord,
      rating: 'g'
    })
    const giphyUrl = giphyRes?.data?.images?.downsized?.url

    if (!giphyUrl) continue

    const incorrectWord = selectRandomWord()
    if (incorrectWord === correctWord) continue

    round = {
      words: randTF() ? [correctWord, incorrectWord] : [incorrectWord, correctWord],
      correctWord,
      giphyUrl,
    }
    break
  }

  if (!round) {
    throw new Error('NO_ROUND_FOUND')
  }

  return round
}

function selectRandomWord(): string {
  const idx = Math.floor(Math.random() * allWords.length)
  return allWords[idx]
}

function randTF(): boolean {
  return Math.random() < 0.5
}
