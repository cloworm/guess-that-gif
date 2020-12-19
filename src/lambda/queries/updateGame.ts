import { adminClient, q } from './adminClient'
import { Game, GameQueryResult } from '../../../types'

export function updateGame(id: string, game: Game): Promise<GameQueryResult> {
  return adminClient.query(
    q.Update(
      q.Ref(q.Collection('Game'), id),
      { data: game }
    )
  )
}
