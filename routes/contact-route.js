'use strict';

const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/ContactController');
const authService = require('../services/auth-service');

router.get('/', authService.authorize, ContactController.index);
router.post('/', authService.authorize, ContactController.create);
router.put('/:id/update', authService.authorize, ContactController.update);

module.exports = router;
