const SubUser = require('../models/subUser.model')
exports.listSubUsers = async (req, res) => {
  console.log(req.query.sortCol)
  let obj = await SubUser.listSubUsers(parseInt(req.query.rows),parseInt(req.query.offset),req.query.sortCol,req.query.orderby);
  //console.log(obj)
  if (obj.error != null) {
    res.status(500).send({
      message: obj.error.message || "Some error occurred while retrieving data."
    })
  }
  else
    res.send(obj.data);
};