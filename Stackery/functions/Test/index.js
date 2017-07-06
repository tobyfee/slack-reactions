const stackery = require('stackery')

module.exports = function handler(message) {
  let body = message.body.toString();
  let fields = body.split('&').map((k) => k.split('='));
  console.log(fields);
  let text = fields.find(field => field[0] == 'text')[1];
  let response = { text: text.split('').reverse().join('') };
  console.log('response is', response);
  return response;
}