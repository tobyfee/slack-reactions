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
    host: 'https://slack.com',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options);
  req.write(postData);
  req.end();
}