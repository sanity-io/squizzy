export default {
  name: 'question',
  title: 'Question',
  type: 'object',
  description: 'A question has mulitple choices and a time limit',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
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
      of: [{type: 'choice'}]
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
