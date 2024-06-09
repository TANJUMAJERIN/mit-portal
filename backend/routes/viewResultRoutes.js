const express = require('express');
const { viewResult } = require('../controllers/viewResultController');
const router = express.Router();

router.post('/view-result', viewResult);

module.exports = router;

module.exports = router;
