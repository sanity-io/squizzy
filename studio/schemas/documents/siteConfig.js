import UUID from '@sanity/uuid'

export default {
  name: 'siteConfig',
  title: 'Site Config',
  type: 'document',
  description: 'General configuration for optimal squizzieness!',
  fields: [
    {
      name: 'welcomeMessage',
      title: 'Welcome Message',
      type: 'string'
    },
    {
      name: 'successComments',
      title: 'Success Comments',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Praise from Squizzy when you answer correctly'
    },
    {
      name: 'failComments',
      title: 'Fail comments',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Cheeky comments from Squizzy when you fail to answer correctly'
    }
  ]
}
