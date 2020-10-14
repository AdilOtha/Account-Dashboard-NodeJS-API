const User = require('../models/user.model')
exports.listUsers = async (req, res) => {
  let obj = await User.listUsers();
  //console.log(obj)
  if (obj.error != null) {
    res.status(500).send({
      message: obj.error.message || "Some error occurred while retrieving data."
    })
  }
  else
    res.send(obj.data);
};

exports.updatePassword = async (req,res) => {
  //console.log(req.body.oldpswd)  
  if(!req.body){
    res.status(400).send({
      message: "Content cannot be empty!"
    })
  }
  console.log(req.body)
  let obj = await User.updatePassword(req.body.id,req.body.newpswd1,req.body.oldpswd).catch(err=>{
    console.log(err);
  });

  if(obj.data.kind=="oldpswd_incorrect"){
    return res.status(200).send({
      error: obj.data.kind,
      message: `Please enter correct old password.`
    })
  }

  if(obj.data.kind=="not_found"){
    return res.status(404).send({
      error: obj.data.kind,
      message: `User with id=${req.body.id} not found`
    })
  }  
  else if(obj.error){
    return res.status(500).send({
      message: obj.error.message || "Some error occurred while updating data."
    })
  }
  else{
    return res.send(obj);
  }
}