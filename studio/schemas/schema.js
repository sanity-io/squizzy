// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import match from './documents/match'
import player from './documents/player'
import quiz from './documents/quiz'
import answer from './objects/answer'
import choice from './objects/choice'
import question from './objects/question'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  types: schemaTypes.concat([match, player, quiz, answer, choice, question])
})
