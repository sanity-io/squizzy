const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: 'puj7p168',
  dataset: 'production',
  useCdn: false,
  // eslint-disable-next-line no-process-env
  token: process.env.SANITY_IO_WRITE_TOKEN
})

module.exports = client
