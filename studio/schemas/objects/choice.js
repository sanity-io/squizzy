export default {
  name: 'choice',
  title: 'Choice',
  type: 'object',
  description: 'A possible Answer to a Question',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'isCorrect',
      title: 'Is correct answer',
      type: 'boolean'
    }
  ],

  preview: {
    select: {
      title: 'title',
      isCorrect: 'isCorrect'
    },
    prepare({title, isCorrect}) {
      return {
        title: `${isCorrect ? '✅' : '❌'} ${title}`
      }
    }
  }
}
