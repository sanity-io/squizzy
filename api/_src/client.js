const sanityClient = require('@sanity/client')
const {sanityClientConfig} = require('../../sanityClientConfig')

sanityClientConfig.token = process.env.SQUIZZY_WRITE_TOKEN
const client = sanityClient(sanityClientConfig)

module.exports = client
