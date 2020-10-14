const express = require("express");
const router = express.Router();
const BillTransaction=require('../controllers/bill-transaction.controller')

router.get('/',BillTransaction.listBillTransactions)

module.exports = router;