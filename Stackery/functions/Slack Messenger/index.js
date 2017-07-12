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
  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });
  
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  
  console.log('writing data')

  req.write(postData);
  console.log('ending request')
  req.end();
  return 'goodbye';
}