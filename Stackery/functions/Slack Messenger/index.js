const stackery = require('stackery');
const http = require('https');
const querystring = require('querystring');

module.exports = function slackMessenger(message = 'Testing...') {
  const postData = querystring.stringify({
    'token': 'bjl16TxNV1KRSoQKBd4StXhZ',
    'channel': 'general',
    'text': message,
  });
  const options = {
    hostname: 'slack.com',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  console.log('making request')
  const req = http.request(options);
  console.log('writing to request')
  req.write(postData);
  console.log('ending request')
  req.end();
  return 'goodbye';
}