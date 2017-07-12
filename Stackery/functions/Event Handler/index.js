const stackery = require('stackery')

module.exports = function reactionCounter(message) {
  const event = JSON.parse(message.body.toString()).event;
  return stackery.output({ action: 'select', where: { id: event.item_user } }).then((result) => {
    let user = result[0].records[0] ? result[0].records[0] : { id: event.item_user };
    user[event.reaction] = user[event.reaction] ? user[event.reaction] + 1 : 1;
    stackery.output({ action: 'put', record: user }).then((result) => {
      return {};
    });
  });
}
