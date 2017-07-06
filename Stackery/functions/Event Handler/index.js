const stackery = require('stackery')

module.exports = function handler(message) {
  let body = JSON.parse(message.body.toString());
  console.log(body);
  return body.challenge;
}