const stackery = require('stackery')

module.exports = function reactionMessageBuilder({ users }) {
  let text = '';
  for (let user in users.sort((u1, u2) => u1.reactions.length - u2.reactions.length)) {
    text += `<@${user.id}>: `;
    // let reactions = user.reactions.sort((r1, r2) => r1.count < r2.count);
    // for (let reaction in reactions) {
    //   message += `:${reaction.name}: x${reaction.count}`;
    // }
  }
  console.log('sending ', text);
  return stackery.output({ text, attachments: [] });
}
