const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate');
const getTotalCountsValidation = require('../validations/Records');

const { getTotalCounts } = require('../controllers');

// validate the request body then call the function getTotalCounts from controller layer
router.post('/', validate(getTotalCountsValidation), getTotalCounts);

module.exports.RecordsRoutes = router;
