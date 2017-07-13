const stackery = require('stackery');
const crypto = require('crypto');

module.exports = function reactionCounter(event) {
  return stackery.output({ action: 'select', where: { id: event.item_user } }).then((result) => {
    let user = result[0].records[0] ? result[0].records[0] : { id: event.item_user, reactions: [] };
    user.reactions.push({ 
      type: event.reaction,
      item_hash: crypto.createHash('md5').update(JSON.stringify(event.item)).digest('hex'),
    });
    return stackery.output({ action: 'put', record: user }).then((result) => ({}));
  });
}
