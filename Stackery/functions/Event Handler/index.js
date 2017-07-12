const stackery = require('stackery')

module.exports = function reactionCounter(message) {
  const event = JSON.parse(message.body.toString()).event;
  return stackery.output({ action: 'select', where: { id: event.item_user } }).then((result) => {
    console.log(result);
  });
}
