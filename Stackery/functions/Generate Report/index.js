const stackery = require('stackery');

module.exports = function reportGenerator(message) {
  return stackery.output({ action: 'select' }, { port: 0 }).then((result) => {
    let report = '';
    let users = result[0].records;
    for (let user of users) {
      report += `<@${user.id}>: `;
      for (let reaction of Object.keys(user).filter(k => k.startsWith(':'))) {
        report += reaction.repeat(user[reaction]);
      }
    }
    return stackery.output({ text: report }, { port: 1 });
  });
}
