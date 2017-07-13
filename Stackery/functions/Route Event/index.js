const stackery = require('stackery')

module.exports = function eventRouter(message) {
  const body = JSON.parse(message.body.toString());
  if (body.token != process.env.VERIFICATION_TOKEN) {
    throw new Error('Invalid Verification Token received from Slack!');
  }
  switch (body.type) {
    case 'url_verification':
      return body.challenge;
    case 'event_callback':
      // Here, we use Stackery's waitFor parameter to specify that we
      // want to return as soon as the message is transmitted, rather
      // than waiting for the promise to resolve, because we need to
      // make sure that we respond to Slack within three seconds
      return stackery.output(body.event, { port, waitFor: 'TRANSMISSION' }).then(() => ({ statusCode: 204 }));
    default:
      throw new Error('Unrecognized event type: ', body);
  }
}
