require('dotenv').config()
import { APIGatewayEvent } from 'aws-lambda'
import compose from 'compose-function'

import { WordSet } from '../../types'
import { httpMethod, httpRespond, Handler } from './lib/http'
import { fetchJson } from './lib/fetchJson'
import { createDoc } from './queries/createDoc'

interface HomophoneWords {
  text: string;
}

interface HomophoneSet {
  id: number;
  words: HomophoneWords[];
}

export const handler: Handler = compose(
  httpMethod('POST'),
  httpRespond(),
)((event: APIGatewayEvent) => response(event?.queryStringParameters?.pageNum))

export async function response(pageNum?: string) {
  if (typeof pageNum === 'undefined') {
    throw new Error('INVALID_PAGENUM')
  }
  const homophoneList = await getHomophonePage(+pageNum)

  return {
    count: (await createData(homophoneList)).length
  }
}

export function createData(list: HomophoneSet[]) {
  const docs = list.map(async (item) => {
    const doc: WordSet = {
      words: item.words.map((word) => word.text),
      eid: item.id,
      numReports: 0
    }

    await createDoc(doc)

    return doc
  })

  return Promise.all(docs)
}

export async function getHomophonePage(pageNum: number): Promise<HomophoneSet[]> {
  return await fetchJson(`https://www.homophone.com/search.json?page=${pageNum}`)
}
