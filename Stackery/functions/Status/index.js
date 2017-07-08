const stackery = require('stackery')

module.exports = function status(message) {
  let event = JSON.parse(message.body.toString()).event;
  console.log('event is', event);
  let action = 'select';
  let where = { id: event.user };
  let user = stackery.output({ action, where, increment });
  console.log('user is ', user);
}
