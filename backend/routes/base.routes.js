const express = require('express');
 
 const { chatBotController, uploadReport, getReports } = require('../controllers/base.controller');
const router = express.Router();

router.post('/chat', chatBotController);
router.post('/uploadReport',uploadReport)
router.post('/getReport',getReports)

 


module.exports = router;