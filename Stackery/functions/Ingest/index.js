const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

module.exports = function eventRouter (event, context, callback) {
  const body = JSON.parse(event.body.toString());
  if (body.token !== process.env.VERIFICATION_TOKEN) {
    throw new Error('Invalid Verification Token received from Slack!');
  }
  switch (body.type) {
    case 'url_verification':
      return callback(null, {
        body: body.challenge,
        statusCode: 200
      });
    case 'event_callback':
      // Here, we use Lambda's 'event' invocation parameter to specify that we
      // want to return as soon as the message is transmitted, rather
      // than waiting for the remote lambda to respond, because we need to
      // make sure that we respond to Slack within three seconds.
      const params = {
        FunctionName: JSON.parse(process.env.STACKERY_PORTS[0][0]).functionName,
        InvocationType: 'Event',
        Payload: JSON.stringify(body)
      };
      lambda.invoke(params).promise().then(callback(null, {
        statusCode: 204,
        body: ''
      }));
      break;
    default:
      callback(new Error('Unrecognized event type: ', body));
  }
};
