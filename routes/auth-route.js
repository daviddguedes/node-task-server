'use strict';

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const authService = require('../services/auth-service');

router.post('/', AuthController.post);
router.post('/authenticate', AuthController.authenticate);
router.post('/refresh-token', authService.authorize, AuthController.refreshToken);

module.exports = router;
