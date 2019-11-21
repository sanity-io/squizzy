export default {
  name: 'answer',
  title: 'Answer',
  type: 'object',
  description: 'An answer submitted to a question. Refers to a Player, Question and Choice',
  fields: [
    {
      name: 'questionKey',
      title: 'Question Key',
      type: 'string',
      description: 'Number referring to a Question by _key (in quiz.questions[])'
    },
    {
      name: 'selectedChoiceKey',
      title: 'Selected Choice Key',
      type: 'string',
      description: 'Number referring to a Choice by _key (in question.choices[])'
    },
    {
      name: 'player',
      title: 'Player',
      type: 'reference',
      to: [{type: 'player'}],
      description: 'The player who submitted the answer'
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      description: 'Point in time when the answer was submitted'
    }
  ],

  preview: {
    select: {
      questionKey: 'questionKey',
      selectedChoiceKey: 'selectedChoiceKey',
      playerName: 'player.name'
    },
    prepare({questionKey, selectedChoiceKey, playerName}) {
      return {
        title: playerName,
        subtitle: `${questionKey} / ${selectedChoiceKey}`
      }
    }
  }
}
