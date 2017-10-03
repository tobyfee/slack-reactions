const stackery = require('stackery');
const https = require('https');
const querystring = require('querystring');

module.exports = function slackMessenger({ text }) {
  const postData = querystring.stringify({
    token: process.env.SLACK_TOKEN,
    channel: 'general',
    text 
  });
  const options = {
    hostname: 'slack.com',
    path: '/api/chat.postMessage',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const request = https.request(options, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        const err = new Error(`Request failed (${response.statusCode})`);
        reject(err);
      } else {
        const data = [];
        response.on('data', chunk => data.push(chunk));
        response.on('end', () => resolve());
      }
    });
    
    request.on('error', (err) => reject(err));

    request.write(postData);
    request.end();
  }); 
}
