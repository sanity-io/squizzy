const micro = require('micro')
const cors = require('micro-cors')()
const {fetchMatch, withdrawPlayerFromMatch} = require('./_src/sanityApi')

const {json, send} = micro

const parse = async req => {
  const postBody = await json(req)
  return postBody
}

const handler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    return send(res, 200, {status: 'ok'})
  }

  if (req.method !== 'POST') {
    return send(res, 404, {error: 'please use post method'})
  }

  const postBody = await parse(req)
  const {playerId, matchSlug} = postBody

  if (!playerId) {
    return send(res, 400, {error: 'missing playerId'})
  }
  if (!matchSlug) {
    return send(res, 400, {error: 'missing matchSlug'})
  }

  const match = await fetchMatch(matchSlug)
  if (!match) {
    return send(res, 400, {error: `no match for slug ${matchSlug}`})
  }

  await withdrawPlayerFromMatch(playerId, match)
  return send(res, 200, {status: 'ok'})
}

module.exports = cors(handler)
