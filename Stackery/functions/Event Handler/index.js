const stackery = require('stackery')

module.exports = function reactionCounter(message) {
  const event = JSON.parse(message.body.toString()).event;
  return stackery.output({ action: 'select', where: { id: event.item_user } }).then((result) => {
    console.log('records are', result);
    let user = result[0].records[0] ? result[0].records[0] : { id: event.item_user, reactions: '' };
    //user.reactions.push({ type: event.reaction });
    console.log('putting', user);
    stackery.output({ action: 'put', record: user }).then((result) => {
      return {};
    });
  });
}
