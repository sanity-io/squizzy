export default {
  name: 'quiz',
  title: 'Quiz',
  type: 'document',
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
    prepare({title, questions}) {
      return {
        title,
        subtitle: `${questions.length} questions`
      }
    }
  }
}
