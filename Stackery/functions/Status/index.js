const stackery = require('stackery')

module.exports = function status(message) {
  let body = message.body.toString();
  let fields = body.split('&').map((k) => k.split('='));
  console.log(fields);
  let action = 'select';
  let where = { id: event.user };
  let user = stackery.output({ action, where, increment });
  console.log('user is ', user);
}
