const stackery = require('stackery');
const crypto = require('crypto');

module.exports = function reactionCounter(event) {
  console.dir(event);
  
  switch (event.type) {
    case 'reaction_added':
      return stackery.output({
        action: 'update',
        where: {
          id: event.item_user
        },
        increment: {
          [`:${event.reaction}:`]: 1
        }
      });
      
    case 'reaction_removed':
      return stackery.output({
        action: 'update',
        where: {
          id: event.item_user
        },
        increment: {
          [`:${event.reaction}:`]: -1
        }
      });
      
    default:
      throw new Error('Unknown event type: ' + event.type);
  }
}
