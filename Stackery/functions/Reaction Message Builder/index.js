const stackery = require('stackery')

module.exports = function reactionMessageBuilder({ users }) {
  let text = '';
  for (let user in users) {
    console.log(user);
    text += `<@${user.id}>: `;
  }
  console.log('sending ', text);
  return stackery.output({ text, attachments: [] });
}
