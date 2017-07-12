const stackery = require('stackery');

module.exports = function status(message) {
  return stackery.output({ action: 'select' }, { port: 0 }).then((result) => {
    console.log('result is', result);
    return stackery.output({ users: result[0].records }, { port: 1 }).then((result) =>  {
      return result;
    });
  });
}
