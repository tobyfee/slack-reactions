const stackery = require('stackery')

module.exports = function reactionCounter(message) {
  console.log(message.body.toString());
  stackery.output({ action: 'insert', record: { user: 'foobar' } });
}
