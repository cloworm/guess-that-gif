import { adminClient, q } from './adminClient'
import { GameInput, GameQueryResult } from '../../../types'

export function createGame(data: GameInput): Promise<GameQueryResult> {
  return adminClient.query<GameQueryResult>(
    q.Create(
      q.Collection('Game'),
      {
        data,
      }
    )
  )
}
