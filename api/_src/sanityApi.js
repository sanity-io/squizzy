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

export const withdrawPlayerFromMatch = async (playerId, match) => {
  return client
    .patch(match._id)
    .unset([`players[_ref=="${playerId}"]`])
    .commit()
}

export const ensurePlayerParticipation = async (player, match) => {
  const playerRef = {_key: nanoid(), _type: 'reference', _ref: player._id}
  return client
    .patch(match._id)
    .setIfMissing({players: []})
    .unset([`players[_ref=="${player._id}"]`])
    .append('players', [playerRef])
    .commit()
}

export const submitAnswer = async (match, playerId, questionKey, selectedChoiceKey) => {
  // Has this player already answered the same quiestion?
  let indexOfExistingAnswer = -1
  const answers = match.answers || []
  answers.forEach((answer, index) => {
    if (answer.questionKey === questionKey && answer.player._ref == playerId) {
      indexOfExistingAnswer = index
    }
  })

  let position
  let operation
  if (indexOfExistingAnswer > -1) {
    operation = 'replace'
    position = `answers[${indexOfExistingAnswer}]`
  } else {
    operation = 'after'
    position = `answers[-1]`
  }

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
    .insert(operation, position, [answer])
    .commit()
}
