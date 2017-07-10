const stackery = require('stackery')

module.exports = function status(message) {
  let body = message.body.toString();
  let fields = body.split('&').map((k) => k.split('='));
  let user = fields.find(field => field[0] == 'user_id')[1];
  return stackery.output({ action: 'select', where: { user } }).then(result => 
    JSON.stringify(result[0].records.reduce((rxns, rxn) => {
      if (rxn.reaction in rxns) {
        rxns[rxn.reaction] += 1; 
      } else {
        rxns[rxn.reaction] = 1;
      }
      return rxns;
    }))
  );
}
