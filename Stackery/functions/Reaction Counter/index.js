const stackery = require('stackery')

module.exports = function reactionCounter(message) {
  let event = JSON.parse(message.body.toString()).event;
  let action = 'update';
  let where = { id: event.item_user };
  let increment = { [event.reaction]: 1 };
  stackery.output({ action, where, increment });
}
