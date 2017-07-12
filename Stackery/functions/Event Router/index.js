const stackery = require('stackery')

module.exports = function eventRouter(message) {
  const event = JSON.parse(message.body.toString()).event;
  switch (event.type) {
    case 'reaction_added': 
      return stackery.output(event, { port: 0 });
    case 'reaction_removed':
      return stackery.output(event, { port: 1 });
    default:
      return stackery.output(event, { port: 2 });
  }
}
