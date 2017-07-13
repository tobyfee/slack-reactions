const stackery = require('stackery');

module.exports = function reportGenerator(message) {
  return stackery.output({ action: 'select' }, { port: 0 }).then((result) => {
    let report = '';
    let users = result[0].records;
    for (let user of users) {
      report += `<@${user.id}>: `;
      delete user.id;
      console.log(user);
      report += Object.keys(user).map((rxn) => `:${rxn.slice(1)}:`).join('');
      report += '\n'
    }
    return stackery.output({ text: report }, { port: 1 });
  });
}
