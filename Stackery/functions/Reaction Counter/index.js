const stackery = require('stackery')

module.exports = function reactionCounter(message) {
  stackery.output({ action: 'insert', record: {} });
}
