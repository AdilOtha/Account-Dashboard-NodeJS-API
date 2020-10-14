const db = require('./query.js')()
const multer = require('multer');
const path = require('path')
const fs=require('fs');
//constructor
const ChatBot = function () {
}

ChatBot.listChatBots = async function () {
  let obj = { data: null, error: null }
  obj.data = await db.query("SELECT flb_name, channel_bot_id, config FROM flb_channels where dashboard_user_id=3 ORDER BY created_on").catch(err => {
    obj.error = err
    console.log(err)
  })
  return obj;
};

ChatBot.listSettings = async function ({ botID }) {
  // console.log(botID)
  let obj = { data: null, error: null }
  obj.data = await db.query("SELECT is_ai_set, ai_type, floatbot_developer_token, floatbot_client_token, api_security_key, notification_type, channel_bot_id, android_push_key,developer_secret_key FROM flb_channels where dashboard_user_id=3 AND channel_bot_id=?", [botID]).catch(err => {
    obj.error = err
    console.log(err)
  })
  return obj;
}

ChatBot.updateSettings = async function ({ botID },req,res) {
  //console.log(req)
  let obj = { data: null, error: null }  
  obj.data = await db.query("SELECT * FROM flb_channels INNER JOIN flb_dashboard_users WHERE flb_dashboard_users.id=flb_channels.dashboard_user_id AND channel_bot_id=?", [botID]).catch(err => {
    obj.error = err
    console.log(err)
  })
  var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      console.log("***")
      fs.mkdir('./uploads', function(err) {
        if(err) {
            console.log(err.stack)
        } else {
          console.log("@@@");
            callback(null, './uploads');
        }
    })
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  var upload = multer({
    dest: "../uploads",
    fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      console.log(ext);
      if (ext !== '.jpeg' || ext !== '.png') {
        return callback(new Error('Only .p12 files are allowed'))
      }
      callback(null, true)
    }
  }).single('iosCertificateSource');
  console.log(res.file)

  upload(req, res, function (err) {
    if (err) {
      obj.error="Error uploading file."
      // return res.end("Error uploading file.");
    }
    // obj.data="File is uploaded";
    console.log("Uploaded")
    // res.send("File is uploaded");
  });
  return obj;
}

ChatBot.deleteBot = async function ({ botID }) {
  // console.log(botID)
  let obj1 = { data: null, error: null }
  let obj2 = { data: null, error: null }
  let obj3 = { data: null, error: null, kind: null }

  //SELECT DATA AND SAVE IN VARIABLE
  obj1.data = await db.query("SELECT * FROM flb_channels WHERE channel_bot_id=? AND production_mode=?", [botID, 0]).catch(err => {
    obj1.error = err
    console.log(err)
  })
  console.log(obj1.data)
  if (obj1.data.length > 0) {

    //DELETE DATA
    obj2.data = await db.query("DELETE FROM flb_channels WHERE channel_bot_id=?", [botID]).catch((err) => {
      obj2.error = err;
      console.log(err);
    })
    let json = JSON.stringify(obj1.data);
    let dashboard_user_id = 3;

    //INSERT DATA INTO NEW TABLE FROM SAVED DATA IN VARIABLE
    obj3.data = await db.query("INSERT INTO flb_channels_deleted(dashboard_user_id,json_string) VALUES(?,?)", [dashboard_user_id, json]).catch((err) => {
      obj3.error = err;
      console.log(err);
    })
    console.log(obj3.data);
  }
  else {
    obj3.kind = {
      message: "ChatBot cannot be deleted!"
    }
  }
  return obj3;
}

module.exports = ChatBot;