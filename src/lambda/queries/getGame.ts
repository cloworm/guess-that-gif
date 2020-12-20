import { adminClient, q } from './adminClient'
import { GameQueryResult } from '../../../types'

export function getGame(id: string): Promise<GameQueryResult> {
  return adminClient.query<GameQueryResult>(
    q.Get(
      q.Ref(q.Collection('Game'), id)
    )
  )
}
