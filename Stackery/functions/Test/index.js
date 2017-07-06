const stackery = require('stackery')

module.exports = function handler(message) {
  let body = message.body.toString();
  console.log(body);
  console.log(typeof(body));

  return { text: body.text.split('').reverse().join('') }
}