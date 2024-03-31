const express = require('express');
const {  } = require('../controllers/auth.controller');
const { nursesController } = require('../controllers/nurses.controller');
const router = express.Router();

router.post('/get', nursesController);
 


module.exports = router;