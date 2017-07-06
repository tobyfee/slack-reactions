const stackery = require('stackery')

module.exports = function handler(message) {
  let body = message.body.toString();
  let fields = body.split(' ').map((k) => k.split('='));
  let text = fields.find(field => field[0] == 'text');
  console.log('text is ', text);
  return { text: text.split('').reverse().join('') }
}