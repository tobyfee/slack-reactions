const stackery = require('stackery')

module.exports = function eventRouter(message) {
  const body = JSON.parse(message.body.toString());
  console.log('Routing: ', body);
  switch (body.type) {
    case 'url_verification':
      return stackery.output(body, { port: 0, waitFor: 'TRANSMISSON' });
    case 'event_callback': 
      switch (body.event.type) {
        case 'reaction_added':
          return stackery.output(body.event, { port: 1, waitFor: 'TRANSMISSON' });
        case 'reaction_removed':
          return stackery.output(body.event, { port: 1, waitFor: 'TRANSMISSON' });
        default:
          throw new Error('Unrecognized event callback: ', body.event);
      }
    default:
      throw new Error('Unrecognized event type: ', body);
  }
}
