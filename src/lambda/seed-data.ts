require('dotenv').config()
import * as faunadb from 'faunadb'
import { APIGatewayEvent, Context } from 'aws-lambda'
import { fetchJson } from './lib/fetchJson'
import { WordSet } from '../../types'

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

  } catch(err) {
    return {
      statusCode: 500,
      body: `Error: ${err}`
    }
  }
}

export async function createData(list: HomophoneSet[]) {
  const docs = list.map(async (item) => {
    const doc = {
      words: item.words.map((word) => word.text),
      index: item.id,
      numReports: 0
    }

    await createDoc(doc)

    return doc
  })

  return docs
}

async function createDoc(set: WordSet) {
  const q = faunadb.query
  const adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET || ''
  })

  return await adminClient.query(
    q.Create(
      q.Collection('WordSet'),
      {
        data: set
      }
    )
  )
}

export async function getHomophonePage(pageNum: number): Promise<HomophoneSet[]> {
  return await fetchJson(`https://www.homophone.com/search.json?page=${pageNum}`)
}
