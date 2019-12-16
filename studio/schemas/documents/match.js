import UUID from '@sanity/uuid'
import {MdTv} from 'react-icons/md'

const createSlug = () => UUID().substring(0, 5)

export default {
  name: 'match',
  title: 'Match',
  type: 'document',
  icon: MdTv,
  description: 'An instance of a Quiz',
  fieldsets: [
    {
      name: 'match-state',
      title: 'Danger Zone - match state data',
      options: {
        collapsible: true,
        collapsed: false
      }
    }
  ],
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Generates a QR-code. The game can also be accessed on /match/the-slug.',
      options: {
        slugify: createSlug
      }
    },
    {
      name: 'quiz',
      title: 'Quiz',
      type: 'reference',
      description: 'You need to have published your quiz before it appears here.',
      to: [{type: 'quiz'}]
    },
    {
      name: 'startedAt',
      title: 'Started At',
      type: 'datetime',
      description: 'This field is managed by a serverless function.',
      fieldset: 'match-state'
    },
    {
      name: 'finishedAt',
      title: 'Finished At',
      type: 'datetime',
      description: 'This field is managed by a serverless function.',
      fieldset: 'match-state'
    },
    {
      name: 'currentQuestionKey',
      title: 'Current Question Key',
      type: 'string',
      description:
        'String referring to a question by _key (in quiz.questions[]). This field is managed by a serverless function.',
      fieldset: 'match-state'
    },
    {
      name: 'isCurrentQuestionOpen',
      title: 'Current Question Open',
      type: 'boolean',
      description:
        'Is the current question open to receive answers? This field is managed by a serverless function.',
      fieldset: 'match-state'
    },
    {
      name: 'players',
      title: 'Players',
      type: 'array',
      of: [{type: 'reference', to: {type: 'player'}}],
      description:
        'Players who have joined the match. This field is managed by a serverless function',
      fieldset: 'match-state'
    },
    {
      name: 'answers',
      title: 'Answers',
      type: 'array',
      of: [{type: 'answer'}],
      description:
        'The answers given by the players. This field is managed by a serverless function',
      fieldset: 'match-state'
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
        title: `[${slug || 'missing slug'}] ${title || 'untitled'}`,
        subtitle
      }
    }
  }
}
