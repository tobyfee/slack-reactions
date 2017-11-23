const stackery = require('stackery');

module.exports = function reactionCounter(body) {
  console.dir(body);

  return isReplay(body.event_id)
    .then(replay => {
      if (!replay) {
        console.log(`New message ID: ${body.event_id}`);
        return recordReaction(body.event);
      } else {
        console.log('Replayed message, discarding');
      }
    })
}

/* Insert a record atomically into the Message IDs table. Make it expire in a
 * day. If we insert successfully, then we haven't seen this event before. If we
 * get a ConditionalCheckFailed error, then we have and should discard the
 * message. */
function isReplay(id) {
  return stackery.output({
    action: 'insert',
    record: {
      id,
      expiration: Math.floor(new Date() / 1000) + 24 * 60 * 60
    }
  })
    .then(() => false)
    .catch(err => {
      if (err.code === 'ConditionalCheckFailed') {
        return true;
      }

      throw err;
    });
}

function recordReaction(event) {
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
      }, {
        port: 1
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
      }, {
        port: 1
      });
      
    default:
      throw new Error('Unknown event type: ' + event.type);
  }
}