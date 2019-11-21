const micro = require('micro')
const query = require('micro-query')
const nanoid = require('nanoid')

const {buffer, text, json, send} = micro
const client = require('../client')

const parse = async req => {
  const postBody = await json(req)
  return postBody
}

const ensurePlayerExists = async (playerId, playerName) => {
  const player = {
    _type: 'player',
    _id: playerId,
    name: playerName
  }
  return client.createOrReplace(player)
}

const fetchMatch = async matchSlug => {
  const match = await client.fetch(
    '*[_type == "match" && slug.current == $matchSlug && !(_id in path("drafts.**"))][0]',
    {
      matchSlug
    }
  )
  return match
}

const ensurePlayerParticipation = async (player, match) => {
  if (match.players && match.players.some(pRef => pRef._ref === player._id)) {
    return Promise.resolve(true)
  }

  const playerRef = {_key: nanoid(), _type: 'reference', _ref: player._id}
  return client
    .patch(match._id)
    .setIfMissing({players: []})
    .append('players', [playerRef])
    .commit()
}

module.exports = async (req, res) => {
  const {method} = req

  if (req.method !== 'POST') {
    return send(res, 404, {error: 'please use post method'})
  }
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
