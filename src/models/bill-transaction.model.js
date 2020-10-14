const db = require('./query.js')()

//constructor
const BillTransaction = function () {
}

BillTransaction.listBillTransactions = async function (rows, offset, sortCol, orderby) {
  let obj = { data: null, error: null }
  console.log(rows + " " + offset + " " + orderby)
  //SELECT ALL RECORDS FOR SEARCH
  if (isNaN(rows) || isNaN(offset)) {
    //console.log("###")
    if (typeof orderby === "undefined" && typeof sortCol === "undefined") {
      console.log("+++")
      obj.data = await db.query("SELECT *,(SELECT COUNT(*) FROM flb_billing_transaction where dashboard_user_id=3) AS rowcount FROM flb_billing_transaction where dashboard_user_id=3")
        .catch(err => {
          obj.error = err
          console.log(err)
        })
    }
    //IF ORDERBY DEFINED: FOR SORTING
    else {
      console.log("---")
      obj.data = await db.query("SELECT *,(SELECT COUNT(*) FROM flb_billing_transaction where dashboard_user_id=3) AS rowcount FROM flb_billing_transaction where dashboard_user_id=3 ORDER BY " + sortCol + " " + orderby)
        .catch(err => {
          obj.error = err
          console.log(err)
        })
    }
  }

  //SELECT ONLY PARTICULAR RECORDS
  else {
    if ((typeof orderby === "undefined") && (typeof sortCol === "undefined")) {
      console.log("***")
      obj.data = await db.query("SELECT *,(SELECT COUNT(*) FROM flb_billing_transaction where dashboard_user_id=3) AS rowcount FROM flb_billing_transaction ORDER BY transaction_date DESC LIMIT ? OFFSET ?", [rows, offset])
        .catch(err => {
          obj.error = err
          console.log(err)
        })
    }
    //IF ORDERBY DEFINED: FOR SORTING
    else {
      console.log("%%%")
      obj.data = await db.query("SELECT *,(SELECT COUNT(*) FROM flb_billing_transaction where dashboard_user_id=3) AS rowcount FROM flb_billing_transaction ORDER BY " + sortCol + " " + orderby + " LIMIT ? OFFSET ?", [rows, offset])
        .catch(err => {
          obj.error = err
          console.log(err)
        })
    }

  }
  return obj;
};

module.exports = BillTransaction;