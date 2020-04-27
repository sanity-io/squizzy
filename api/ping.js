// Use this endpoint to test that the server is up and running
const micro = require('micro')
const cors = require('micro-cors')()
const {send} = micro

const handler = async (req, res) => {
  return send(res, 200, 'pong')
}

module.exports = cors(handler)
