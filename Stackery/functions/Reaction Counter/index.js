const stackery = require('stackery')

module.exports = function reactionCounter(message) {
  let event = JSON.parse(message.body.toString()).event;
  console.log('event is', event);
  let action = 'update';
  let where = { id: event.item_user };
  console.log('incrementing', event.reaction, 'by', 1);
  let increment = { [event.reaction]: 1 };
  stackery.output({ action, where, increment });
}
