const ChatBot = require('../models/chatbot.model')
exports.listChatBots = async (req, res) => {
  let obj = await ChatBot.listChatBots();
  //console.log(obj)
  if (obj.error != null) {
    res.status(500).send({
      message: obj.error.message || "Some error occurred while retrieving data."
    })
  }
  else
    res.send(obj.data);
};

exports.listSettings = async (req, res) => {
  //console.log(req.query)
  let obj = await ChatBot.listSettings(req.query);
  console.log(obj)
  if (obj.error != null) {
    res.status(500).send({
      message: obj.error.message || "Some error occurred while retrieving data."
    })
  }
  else
    res.send(obj.data);
};

exports.updateSettings = async (req, res) => {
  console.log(req)
  let obj = await ChatBot.updateSettings(req.query,req,res);
  console.log(obj)
  if (obj.error != null) {
    res.status(500).send({
      message: obj.error.message || "Some error occurred while retrieving data."
    })
  }
  else
    res.send(obj.data);
};

exports.deleteBot = async (req, res) => {
  console.log(req.body)
  let obj = await ChatBot.deleteBot(req.body);
  console.log(obj)
  if (obj.error != null) {
    res.status(500).send({
      message: obj.error.message || "Some error occurred while retrieving data."
    })
  }
  else if (obj.kind != null) {
    res.send(obj.kind)
  }
  else
    res.send(obj.data);
};