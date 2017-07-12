const stackery = require('stackery')

module.exports = function reactionMessageBuilder({ users }) {
  let text = '';
  console.log('users are', users);
  for (let user of users) {
    console.log('reactions are', user.reactions);
    text += `<@${user.id}>: `;
    for (let reaction of user.reactions) {
      text += `:${reaction.type}`;
    }
    text += '\n'
  }
  return stackery.output({ text: text || 'No reactions recorded!' });
}
