'use strict';

const repository = require('../repositories/auth-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');

exports.post = async (req, res, next) => {
    try {
        await repository.create({
            username: req.body.username,
            password: md5(req.body.password + global.SALT_KEY)
        });

        res.status(201).send({
            message: 'Create user succesfully!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Ops...error...'
        });
    }
};

exports.authenticate = async (req, res, next) => {
    try {
        const user = await repository.authenticate({
            username: req.body.username,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!user) {
            res.status(404).send({
                message: 'Username or password invalid!'
            });
            return;
        }

        const token = await authService.generateToken({
            id: user._id,
            username: user.username
        });

        res.status(201).send({
            token: token,
            data: {
                username: user.username
            }
        });
    } catch (e) {
        res.status(500).send({
            message: e
        });
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const user = await repository.getById(data.id);

        if (!user) {
            res.status(404).send({
                message: 'User not found.'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: user._id,
            username: user.username
        });

        res.status(201).send({
            token: token,
            data: {
                username: user.username
            }
        });
    } catch (e) {
        res.status(500).send({
            message: "Ops...error..."
        });
    }
};