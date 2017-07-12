const stackery = require('stackery')

module.exports = function eventRouter(message) {
  const body = JSON.parse(message.body.toString());
  switch (body.type) {
    case 'url_verification':
      return stackery.output(body, { port: 0 });
    case 'event_callback': 
      switch (body.event.type) {
        case 'reaction_added':
          return stackery.output(body.event, { port: 1 });
        case 'reaction_removed':
          return stackery.output(body.event, { port: 1 });
        default:
          throw new Error('Unrecognized event callback: ', body.event);
      }
    default:
      throw new Error('Unrecognized event type: ', body);
  }
}
