const express = require("express");
const router = express.Router();
const ChatBot=require('../controllers/chatbot.controller')

router.get('/',ChatBot.listChatBots)

router.get('/settings',ChatBot.listSettings)

router.post('/delete',ChatBot.deleteBot)

router.post('/update-settings',ChatBot.updateSettings)

module.exports = router;