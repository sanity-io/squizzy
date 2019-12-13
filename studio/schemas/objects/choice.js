import * as config from '../../quizConfig'
const {maxAnswerLength} = config.default.schema

export default {
  name: 'choice',
  title: 'Choice',
  type: 'object',
  description: 'A possible Answer to a Question',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule =>
        Rule.custom(title => {
          if (!title) {
            return 'An answer needs a title'
          }
          if (title.length > maxAnswerLength) {
            return `An answer can't be longer that ${maxAnswerLength} characters. This one has ${title.length}`
          }
          return true
        })
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
