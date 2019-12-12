import UUID from '@sanity/uuid'
const createSlug = () => UUID().substring(0, 5)

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
        slugify: createSlug
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
      name: 'currentQuestionKey',
      title: 'Current Question Key',
      type: 'string',
      description: 'String referring to a question by _key (in quiz.questions[])'
    },
    {
      name: 'isCurrentQuestionOpen',
      title: 'Current Question Open',
      type: 'boolean',
      description: 'Is the current question open to receive answers?'
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
  initialValue: () => ({
    slug: {
      current: createSlug(),
      _type: 'slug'
    }
  }),
  preview: {
    select: {
      title: 'quiz.title',
      slug: 'slug.current',
      players: 'players',
      startedAt: 'startedAt',
      finishedAt: 'finishedAt'
    },
    prepare({title, slug, players, startedAt, finishedAt}) {
      const isOngoing = startedAt && !finishedAt
      const isNotYetStarted = !startedAt && !finishedAt
      const numberOfPlayers = players && players.length > 0 ? players.length : 0
      let subtitle
      if (isNotYetStarted) {
        subtitle = 'Not yet started'
      } else {
        subtitle = isOngoing ? 'Is ongoing!' : 'Finished'
      }
      subtitle = `${subtitle} - ${numberOfPlayers} player${numberOfPlayers === 1 ? '' : 's'}`
      return {
        title: `[${slug}] ${title}`,
        subtitle
      }
    }
  }
}
