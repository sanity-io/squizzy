import React from 'react'
import MyToolIcon from 'react-icons/lib/md/play-arrow'
import {route} from 'part:@sanity/base/router'
import QuizMatchTool from './QuizMatchTool'

export default {
  title: `Let's play`,
  name: 'quiz-match',
  router: route('/:selectedDocumentId'),
  icon: MyToolIcon,
  component: QuizMatchTool
}
