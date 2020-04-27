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
      description: `Given in seconds. ${defaultTimeLimit} seconds is a good default.`,
      validation: Rule => Rule.required().error('You must set a time limit.')
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'The image can be relevant or irrelevant to your question. Up to you!',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'For screen readers etc.',
          options: {
            isHighlighted: true
          }
        }
      ]
    },
    {
      name: 'choices',
      title: 'Answer choices',
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
