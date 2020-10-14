const Agent = require('../models/agent.model')
exports.listAgents = async (req, res) => {
  let obj = await Agent.listAgents(parseInt(req.query.rows),parseInt(req.query.offset),req.query.sortCol,req.query.orderby);
  //console.log(obj)
  if (obj.error != null) {
    res.status(500).send({
      message: obj.error.message || "Some error occurred while retrieving data."
    })
  }
  else
    res.send(obj.data);
};