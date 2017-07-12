const stackery = require('stackery')

module.exports = function reactionMessageBuilder({ users }) {
  let text = '';
  for (let user of users) {
    text += `<@${user.id}>: `;
    for (let reaction of user.reactions) {
      text += `:${reaction.type}`;
    }
    text += '\n'
  }
  return stackery.output({ text: text || 'No reactions recorded!' });
}
