import * as faunadb from 'faunadb'
import giphy from 'giphy-api'

import {
  Round
} from '../../../types'

const Giphy = giphy(process.env.GIPHY_API_KEY)

export async function getRound() {
  const q = faunadb.query
  const adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET || ''
  })

  const maxEid = 18
  const maxTries = 50
  let round: Round | undefined

  for (let i = 0; i < maxTries; i++) {
    const random = Math.floor(Math.random() * maxEid) + 1
    let res: any
    try {
      res = await adminClient.query(
        q.Get(
          q.Match(q.Index('eid'), random)
        )
      )
    } catch(err) {
      console.log('err', err)
    }

    if (res?.data?.words?.length > 0) {
      const words = res.data.words
      const correctWord = selectRandomWord(words)

      const giphyRes = await Giphy.random({
        tag: correctWord,
        rating: 'g'
      })

      if (giphyRes?.data?.images?.downsized?.url) {
        round = {
          words,
          correctWord,
          giphyUrl: giphyRes?.data?.images?.downsized?.url
        }
        break
      }
    }
  }

  if (typeof round === 'undefined') {
    throw new Error('NO_ROUND_FOUND')
  }

  return round
}

function selectRandomWord(words: string[]) {
  const idx = Math.floor(Math.random() * words.length)
  return words[idx]
}
