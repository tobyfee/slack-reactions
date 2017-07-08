const stackery = require('stackery')

//     "event": {
//               "type": "reaction_added",
//                 "user": "U5UTLD724",
//                 "item": {
//                               "type": "message",
//                                 "channel": "C5WCUKPU7",
//                                 "ts": "1499379574.375919"
//                           },
//                 "reaction": "joy",
//                 "item_user": "U5UTLD724",
//                 "event_ts": "1499542683.228446"

module.exports = function reactionCounter(message) {
  let body = message.body.toString();
  let event = body.event;
  console.log('body is ', body);
  console.log('event is ', event);
  let clause = { user: { condition: '=', value: event.item_user } };
  console.log('clause is ', clause);
  let user = stackery.output({ action: 'select', where: clause }) || { user: event.item_user, reactions: [] };
  console.log('user is ', user);
  user.reactions.push(event.reaction);
  console.log(user);
  stackery.output({ action: 'put', record: user });
}
