const db = require('./query.js')()
const md5 = require('md5')

//constructor
const User = function () {
}



User.listUsers = async function () {
  let obj = { data: null, error: null }

  obj.data = await db.query("SELECT * FROM flb_dashboard_users").catch(err => {
    obj.error = err
    console.log(err)
  })

  return obj;
};

User.updatePassword = async function (id, newpswd, oldpswd) {
  let obj = { data: null, error: null, kind: null }
  if (!oldpswd)
    return console.log(oldpswd)
  //HASH OLD PASSWORD
  oldpswd = md5(oldpswd)
  obj.data = await db.query("SELECT COUNT(*) AS count FROM flb_dashboard_users WHERE id=3 AND channel_password=?", [oldpswd])
    .catch(err => {
      obj.error = err
      console.log(err)
    })
  // console.log(obj.data[0].count)
  //IF OLD PASSWORD IS INCORRECT
  if (obj.data[0].count == 0) {
    obj.data = { kind: "oldpswd_incorrect" }
    return obj;
  }

  //IF OLD PASSWORD IS CORRECT

  //HASH NEW PASSWORD
  newpswd = md5(newpswd)
  obj.data = await db.query("UPDATE flb_dashboard_users SET channel_password=? WHERE id=?", [newpswd, id]).catch(err => {
    obj.error = err
    console.log(err)
  })
  if (obj.data.affectedRows == 0) {
    obj.data = { kind: "not_found" }
  }
  console.log(obj.data)
  return obj;
}

module.exports = User;