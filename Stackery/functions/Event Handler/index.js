const stackery = require('stackery')

module.exports = function reactionCounter(message) {
  let event = JSON.parse(message.body.toString()).event;
  let action = 'put';
  let record = { user: event.item_user, timestamp: parseFloat(event.event_ts), reaction: event.reactions  };
  stackery.output({ action, record });
}
