const express = require("express");
const router = express.Router();
const Agent=require('../controllers/agent.controller')

router.get('/',Agent.listAgents)

module.exports = router;