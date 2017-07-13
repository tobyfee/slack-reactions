const stackery = require('stackery');
const crypto = require('crypto');

module.exports = function reactionCounter(event) {
  const action = 'update';
  const where = { id: event.item_user };
  switch (event.type) {
    case 'reaction_added':
      let increment = { ['_' + reaction.type]: 1 };
      return stackery.output({ action , where, increment });
    case 'reaction_removed':
      let increment = { ['_' + reaction.type]: -1 };
      return stackery.output({ action , where, increment });
    default:
      throw new Error('Unknown event type: ' + event.type);
  }
}
