const stackery = require('stackery')

module.exports = function status(message) {
  let body = message.body.toString();
  let fields = body.split('&').map((k) => k.split('='));
  let id = fields.find(field => field[0] == 'user_id')[1];
  let user = Promise.resolve(stackery.output({ action: 'select', where: { id } }));
  console.log(user);
  return JSON.stringify(user);
}
