const client = require('./client')
const nanoid = require('nanoid')

export const ensurePlayerExists = async (playerId, playerName) => {
  const player = {
    _type: 'player',
    _id: playerId,
    name: playerName
  }
  return client.createOrReplace(player)
}

export const fetchMatch = async matchSlug => {
  const match = await client.fetch(
    '*[_type == "match" && slug.current == $matchSlug && !(_id in path("drafts.**"))][0]',
    {
      matchSlug
    }
  )
  return match
}

export const ensurePlayerParticipation = async (player, match) => {
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

// export const submitAnswer = async () => {
//   return true
// }

export const submitAnswer = async (match, playerId, questionKey, selectedChoiceKey) => {
  // todo: there there exists an answer, remove it first
  const answer = {
    _key: nanoid(),
    _type: 'answer',
    player: {
      _type: 'reference',
      _ref: playerId
    },
    questionKey,
    selectedChoiceKey,
    submittedAt: new Date().toISOString()
  }

  return client
    .patch(match._id)
    .setIfMissing({answers: []})
    .append('answers', [answer])
    .commit()
}
