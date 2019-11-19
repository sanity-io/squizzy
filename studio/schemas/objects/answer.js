export default {
  name: 'answer',
  title: 'Answer',
  type: 'object',
  description: 'An answer submitted to a question. Refers to a Player, Question and Choice',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'number',
      description: 'Index number referring to question in the quiz'
    },
    {
      name: 'selectedChoice',
      title: 'Selected Choice',
      type: 'number',
      description: 'Index number referring to a particular choice on the question'
    },
    {
      name: 'player',
      title: 'Player',
      type: 'reference',
      to: [{type: 'player'}],
      description: 'The player who submitted the answer'
    }
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image'
    },
    prepare({title, media}) {
      return {
        title,
        media
      }
    }
  }
}
