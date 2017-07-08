const stackery = require('stackery')

module.exports = function status(message) {
  let body = message.body.toString();
  let fields = body.split('&').map((k) => k.split('='));
  let id = fields.find(field => field[0] == 'user_id')[1];
  let user = stackery.output({ action: 'select', where: { id } });
  console.log('asking for', { action: 'select', where: { id } });
  console.log('user is', user);
  return JSON.stringify(user);
}
