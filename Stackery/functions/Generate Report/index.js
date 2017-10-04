const stackery = require('stackery');

module.exports = function reportGenerator(message) {
  // Get reaction records from connected Table
  return stackery.output({ action: 'select' })
    .then(result => {
      let report = 'Reactions Today:';
      let users = result[0].records;
      
      // Generate Slack reaction report message
      for (let user of users) {
        report += `\n<@${user.id}>: `;
        for (let reaction of Object.keys(user).filter(k => k.startsWith(':'))) {
          report += reaction.repeat(Math.max(0, user[reaction]));
        }
      }
      
      // Output report message, then delete all current records
      return stackery.output({ text: report }, { port: 1 })
        .then(() => {
          const deletePromises = users
            .map(user => stackery.output({
              action: 'delete',
              where: {
                id: user.id
              }
            }))
          
          return Promise.all(deletePromises);
        })
    })
}
