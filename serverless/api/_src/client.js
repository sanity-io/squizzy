const sanityClient = require('@sanity/client')
console.log('-------', process.env.SQUIZZY_WRITE_TOKEN)
const client = sanityClient({
  projectId: 'puj7p168',
  dataset: 'production',
  useCdn: false,
  // eslint-disable-next-line no-process-env
  token: process.env.SQUIZZY_WRITE_TOKEN
})

module.exports = client
