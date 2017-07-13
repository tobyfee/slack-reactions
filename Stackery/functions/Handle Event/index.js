const stackery = require('stackery');
const crypto = require('crypto');

module.exports = function reactionCounter(event) {
  const action = 'update';
  const where = { id: event.item_user };
  switch (event.type) {
    case 'reaction_added':
      return stackery.output({ action , where, increment: { ['_' + event.reaction]: 1 } });
    case 'reaction_removed':
      return stackery.output({ action , where, increment: { ['_' + event.reaction]: -1 } });
    default:
      throw new Error('Unknown event type: ' + event.type);
  }
}
