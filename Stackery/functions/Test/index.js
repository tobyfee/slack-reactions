const stackery = require('stackery')

module.exports = function handler(message) {
  let body = message.body.toString();

  return { text: body.text.split('').reverse().join('') }
}