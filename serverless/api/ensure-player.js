const micro = require('micro')
const query = require('micro-query')

const {buffer, text, json, send} = micro
const client = require('../client')

const parse = async req => {
  const postBody = await json(req)
  return postBody
}

module.exports = async (req, res) => {
  const {method} = req
  if (req.method !== 'POST') {
    return send(res, 404, {error: 'please use post method'})
  }
  const postBody = await parse(req)
  const {playerId, playerName} = postBody

  if (!playerId) {
    return send(res, 400, {error: 'missing playerId'})
  }
  if (!playerName) {
    return send(res, 400, {error: 'missing playerName'})
  }

  console.log('sup', playerId, playerName)

  send(res, 200, {status: 'ok'})
}
