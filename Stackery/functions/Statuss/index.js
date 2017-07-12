const stackery = require('stackery');

module.exports = function status(message) {
  return stackery.output({ action: 'select' }, { port: 0 }).then((result) => {
    return stackery.output(result[0].records, { port: 1 }).then((result) =>  {
      return result;
    });
  });
}
