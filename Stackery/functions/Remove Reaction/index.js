const stackery = require('stackery');
const crypto = require('crypto');

module.exports = function reactionCounter(event) {
  return stackery.output({ action: 'select', where: { id: event.item_user } }).then((result) => {
    let user = result[0].records[0] ? result[0].records[0] : { id: event.item_user, reactions: [] };
    let item_hash = crypto.createHash('md5').update(JSON.stringify(event.item)).digest('hex');
    user.reactions = user.reactions.filter((rxn) => rxn.item_hash != item_hash);
    return stackery.output({ action: 'put', record: user }).then((result) => ({}));
  });
}
