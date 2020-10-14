const BillTransaction = require('../models/bill-transaction.model')
exports.listBillTransactions = async (req, res) => {
  console.log(req.query.orderby)
  let obj = await BillTransaction.listBillTransactions(parseInt(req.query.rows),parseInt(req.query.offset),req.query.sortCol,req.query.orderby);
  //console.log(obj)
  if (obj.error != null) {
    res.status(500).send({
      message: obj.error.message || "Some error occurred while retrieving data."
    })
  }
  else
    res.send(obj.data);
};