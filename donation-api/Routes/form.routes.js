const express = require('express');
const { getFormConfigByRoute } = require('../controllers/form.controller');
const router = express.Router();
  
router.get('/master/donation-type', getFormConfigByRoute);
 
module.exports = router;