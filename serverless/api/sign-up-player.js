const micro = require('micro')
const query = require('micro-query')
const {ensurePlayerExists, ensurePlayerParticipation, fetchMatch} = require('./_src/sanityApi')
const {buffer, text, json, send} = micro

const parse = async req => {
  const postBody = await json(req)
  return postBody
}

module.exports = async (req, res) => {
  const {method} = req

  if (req.method !== 'POST') {
    return send(res, 404, {error: 'please use post method'})
  }

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST')

  const postBody = await parse(req)
  const {playerId, playerName, matchSlug} = postBody

  if (!playerId) {
    return send(res, 400, {error: 'missing playerId'})
  }
  if (!playerName) {
    return send(res, 400, {error: 'missing playerName'})
  }
  if (!matchSlug) {
    return send(res, 400, {error: 'missing matchSlug'})
  }

  const player = await ensurePlayerExists(playerId, playerName)
  const match = await fetchMatch(matchSlug)
  if (!match) {
    return send(res, 400, {error: `no match for slug ${matchSlug}`})
  }

  const result = await ensurePlayerParticipation(player, match)
  return send(res, 200, {status: 'ok'})
}
