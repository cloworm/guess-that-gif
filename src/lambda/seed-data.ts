require('dotenv').config()
import { APIGatewayEvent, Context } from 'aws-lambda'
import { WordSet } from '../../types'
import { fetchJson } from './lib/fetchJson'
import { createDoc } from './queries/createDoc'

interface HomophoneWords {
  text: string;
}

interface HomophoneSet {
  id: number;
  words: HomophoneWords[];
}

export async function handler (
  event: APIGatewayEvent,
  _context: Context
) {
  try {
    const pageNum = event?.queryStringParameters?.pageNum
    if (typeof pageNum === 'undefined') {
      throw new Error('INVALID_PAGENUM')
    }
    const homophoneList = await getHomophonePage(+pageNum)
    await createData(homophoneList)

    return {
      statusCode: 200,
      body: 'OK'
    }

  } catch(err) {
    return {
      statusCode: 500,
      body: `Error: ${err}`
    }
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
