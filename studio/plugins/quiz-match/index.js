import {MdPlayArrow} from 'react-icons/md'
import {route} from 'part:@sanity/base/router'
import QuizMatchTool from './QuizMatchTool'

export default {
  title: `Let's play`,
  name: 'quiz-match',
  router: route('/:selectedDocumentId'),
  icon: MdPlayArrow,
  component: QuizMatchTool
}
