import fetch from 'node-fetch'

export async function fetchJson(url: string) {
  const res = await fetch(url)
  return res.json()
}
