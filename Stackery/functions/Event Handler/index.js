const stackery = require('stackery')

module.exports = function handler(message) {
  console.dir(message)
  return JSON.parse(message).challenge;
}