const maxNumberOfChoices = 4
const minNumberOfChoices = 2
const maxQuestionLength = 100

export default {
  name: 'question',
  title: 'Question',
  type: 'object',
  description: 'A question has multiple choices and a time limit',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule =>
        Rule.custom(title => {
          if (!title) {
            return 'What was the question, again?'
          }
          if (title.length > maxQuestionLength) {
            return `A question can't be longer than ${maxQuestionLength} characters. This one has ${title.length}`
          }
          return true
        })
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'choices',
      title: 'Choices',
      type: 'array',
      of: [{type: 'choice'}],
      validation: Rule =>
        Rule.custom(choices => {
          if (!choices) {
            return true
          }
          if (choices.length < minNumberOfChoices) {
            return 'A question must have at least 2 choices'
          }
          if (choices.length > maxNumberOfChoices) {
            return 'A question can have a maximum of 4 choices'
          }
          return true
        })
    },
    {
      name: 'timeLimit',
      title: 'Time Limit',
      type: 'number',
      placeholder: '20',
      description: 'Given in seconds'
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
