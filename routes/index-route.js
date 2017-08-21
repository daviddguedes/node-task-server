'use strict';

const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/IndexController');

/* GET users listing. */
router.get('/', IndexController.index);

module.exports = router;
