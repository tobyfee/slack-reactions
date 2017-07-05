const stackery = require('stackery')

module.exports = function handler(message) {
  console.log('hello?')
  console.log(message);
  return JSON.parse(message).challenge;
}