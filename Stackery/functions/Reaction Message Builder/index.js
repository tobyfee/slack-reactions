const stackery = require('stackery')

module.exports = function reactionMessageBuilder({ users }) {
  let text = '';
  console.log(users);
  for (let user in users) {
    text += `<@${user.id}>: `;
  }
  console.log('sending ', text);
  return stackery.output({ text, attachments: [] });
}
