import {MdFace} from 'react-icons/md'

export default {
  name: 'player',
  title: 'Player',
  type: 'document',
  icon: MdFace,
  description:
    'A person or a group of people joining a Match. Could perhaps be more correctly be named "device" as one Player maps to one connected device?',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    }
  ]
}
