const stackery = require('stackery')

module.exports = function handler(message) {
  console.log('We\'re in the handler')
  console.log(message.body);
  console.log('That was the message')
  console.log('Body type is ', typeof(message.body))
  return JSON.parse(message).challenge;
}