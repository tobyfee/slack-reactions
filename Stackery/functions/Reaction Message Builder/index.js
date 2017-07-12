const stackery = require('stackery')

module.exports = function reactionMessageBuilder({ users }) {
  let text = '';
  for (let user of users) {
    text += `<@${user.id}>: `;
  }
  return stackery.output({ text });
}
