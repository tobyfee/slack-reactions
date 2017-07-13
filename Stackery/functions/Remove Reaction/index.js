const stackery = require('stackery')

module.exports = function reactionCounter(event) {
  return stackery.output({ action: 'select', where: { id: event.item_user } }).then((result) => {
    let user = result[0].records[0] ? result[0].records[0] : { id: event.item_user, reactions: [] };
    console.log('Event is ', event);
    return {}
  });
}
