import {MdQuestionAnswer} from 'react-icons/md'

export default {
  name: 'quiz',
  title: 'Quiz',
  type: 'document',
  icon: MdQuestionAnswer,
  description:
    'A list of questions along with possible answers (choices). Play a Quiz by creating a Match',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'questions',
      title: 'Questions',
      type: 'array',
      validation: Rule => Rule.min(1).error('A quiz must have at least one question'),
      of: [{type: 'question'}]
    },
    {
      name: 'musicUrl',
      title: 'URL to a music resource',
      type: 'url',
      description: 'Played while a question is open for answering'
    }
  ],
  preview: {
    select: {
      title: 'title',
      questions: 'questions'
    },
    prepare({title, questions = []}) {
      const numberOfQuestions = questions.length
      return {
        title: title || 'untitled quiz 😢',
        subtitle: `${numberOfQuestions} ${numberOfQuestions === 1 ? 'question' : 'questions'}`
      }
    }
  }
}
