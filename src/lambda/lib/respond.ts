export async function respond(response: Function) {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(await response())
    }
  } catch(err) {
    return {
      statusCode: 500,
      body: `Error: ${err}`
    }
  }
}
