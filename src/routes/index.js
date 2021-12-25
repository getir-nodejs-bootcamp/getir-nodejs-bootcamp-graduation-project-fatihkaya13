const express = require('express');
const router = express.Router();

const { getTotalCounts } = require('../controllers');

router.post('/', getTotalCounts);

module.exports.RecordsRoutes = router;

