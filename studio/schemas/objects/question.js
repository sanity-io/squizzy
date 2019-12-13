import * as config from '../../quizConfig'
const {
  minNumberOfChoices,
  maxNumberOfChoices,
  maxQuestionLength,
  defaultTimeLimit
} = config.default.schema

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
      name: 'timeLimit',
      title: 'Time Limit',
      type: 'number',
      placeholder: defaultTimeLimit,
      description: 'Given in seconds',
      validation: Rule => Rule.required()
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
            return `A question must have at least ${minNumberOfChoices} choices`
          }
          if (choices.length > maxNumberOfChoices) {
            return `A question can have a maximum of ${maxNumberOfChoices} choices`
          }
          return true
        })
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
