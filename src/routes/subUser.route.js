const express = require("express");
const router = express.Router();
const SubUser=require('../controllers/subUser.controller')

router.get('/',SubUser.listSubUsers)

module.exports = router;