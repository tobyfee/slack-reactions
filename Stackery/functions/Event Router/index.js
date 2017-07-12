const stackery = require('stackery')

module.exports = function eventRouter(message) {
  const body = JSON.parse(message.body.toString());
  switch (body.type || body.event.type) {
    case 'url_verification':
      return stackery.output(body, { port: 0 });
    case 'reaction_added': 
      return stackery.output(body.event, { port: 1 });
    case 'reaction_removed':
      return stackery.output(body.event, { port: 2 });
    default:
      throw new Error('Unrecognized event: ', body.event);
  }
}
