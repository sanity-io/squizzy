export default {
  name: 'answer',
  title: 'Answer',
  type: 'object',
  description: 'An answer submitted to a question. Refers to a Player, Question and Choice',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'Number referring to a Question by _key (in quiz.questions[])'
    },
    {
      name: 'selectedChoice',
      title: 'Selected Choice',
      type: 'string',
      description: 'Number referring to a Choice by _key (in question.choices[])'
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
