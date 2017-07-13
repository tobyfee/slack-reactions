const stackery = require('stackery')

module.exports = function reactionCounter(event) {
  return stackery.output({ action: 'select', where: { id: event.item_user } }).then((result) => {
    let user = result[0].records[0] ? result[0].records[0] : { id: event.item_user, reactions: [] };
    user.reactions.push({ 
      type: event.reaction,
      timestamp: parseFloat(event.event_ts), 
    });
    return stackery.output({ action: 'put', record: user }).then((result) => ({}));
  });
}
