import UUID from '@sanity/uuid'

export default {
  name: 'match',
  title: 'Match',
  type: 'document',
  description: 'An instance of a Quiz',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        slugify: () => UUID().substring(0, 5)
      }
    },
    {
      name: 'quiz',
      title: 'Quiz',
      type: 'reference',
      to: [{type: 'quiz'}]
    },
    {
      name: 'startedAt',
      title: 'Started At',
      type: 'datetime'
    },
    {
      name: 'finishedAt',
      title: 'Finished At',
      type: 'datetime'
    },
    {
      name: 'currentQuestion',
      title: 'Current question',
      type: 'number',
      description:
        'Index number referring to a question in the quiz which should currently be answered'
    },
    {
      name: 'players',
      title: 'Players',
      type: 'array',
      of: [{type: 'reference', to: {type: 'player'}}],
      description: 'Players who have joined the match'
    },
    {
      name: 'answers',
      title: 'Answers',
      type: 'array',
      of: [{type: 'answer'}]
    }
  ],
  preview: {
    select: {
      title: 'quiz.title',
      media: 'quiz.image'
    },
    prepare({title, media}) {
      return {
        title,
        media
      }
    }
  }
}
