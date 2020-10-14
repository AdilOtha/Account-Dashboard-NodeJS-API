const express = require("express");
const router = express.Router();
const User=require('../controllers/user.controller')

router.get('/',User.listUsers)

router.post('/update-password',User.updatePassword)

module.exports = router;