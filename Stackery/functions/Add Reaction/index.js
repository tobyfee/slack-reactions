const stackery = require('stackery')

module.exports = function reactionCounter(event) {
  return stackery.output({ action: 'select', where: { id: event.item_user } }).then((result) => {
    console.log('records are', result);
    console.log('event is', event);
    let user = result[0].records[0] ? result[0].records[0] : { id: event.item_user, reactions: [] };
    user.reactions.push({ 
      type: event.reaction, 
      timestamp: parseFloat(event.event_ts), 
      expiration: parseFloat(event.event_ts) + 86400,
    });
    console.log('putting', user);
    return stackery.output({ action: 'put', record: user }).then((result) => {
      console.log('result from putting is ', result);
      return {};
    });
  });
}
