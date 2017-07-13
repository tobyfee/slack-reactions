const stackery = require('stackery')

module.exports = function eventRouter(message) {
  const body = JSON.parse(message.body.toString());
  const output = (port, data) => stackery.output(data, { port, waitFor: 'TRANSMISSION' }).then(() => ({ statusCode: 204 }));
  switch (body.type) {
    case 'url_verification':
      return output(0, body);
    case 'event_callback':
      switch (body.event.type) {
        case 'reaction_added':
          return output(1, body.event);
        case 'reaction_removed':
          console.log('responding to reaction removed event')
          return output(2, body.event);
        default:
          throw new Error('Unrecognized event callback: ', body.event);
      }
    default:
      throw new Error('Unrecognized event type: ', body);
  }
}
