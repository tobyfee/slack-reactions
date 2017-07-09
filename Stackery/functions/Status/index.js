const stackery = require('stackery')

module.exports = function status(message) {
  let body = message.body.toString();
  let fields = body.split('&').map((k) => k.split('='));
  let id = fields.find(field => field[0] == 'user_id')[1];
  return stackery.output({ action: 'select', where: { id } }).then(result => JSON.stringify(result[0].records));
}
